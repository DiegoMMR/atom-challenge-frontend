import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ChatApiService } from './chat-api.service';
import { ChatMessage, ChatUiState, Role, SendMessageData } from './chat.models';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-live-chat',
  imports: [],
  templateUrl: './live-chat.html',
  styleUrl: './live-chat.css',
})
export class LiveChat {
  private readonly chatApi = inject(ChatApiService);

  // ── Estado ──────────────────────────────────────────────────────────
  readonly messages = signal<ChatMessage[]>([]);
  readonly uiState = signal<ChatUiState>({ isWaiting: false, error: null });
  readonly inputText = signal('');
  private readonly lastUserText = signal<string | null>(null);

  // ── Computados ──────────────────────────────────────────────────────
  readonly isWaiting = computed(() => this.uiState().isWaiting);
  readonly statusLabel = computed(() => (this.uiState().isWaiting ? 'Respondiendo…' : 'En línea'));
  readonly canSend = computed(
    () => this.inputText().trim().length > 0 && !this.uiState().isWaiting,
  );

  // ── Ref DOM (function-based, Angular 17+) ───────────────────────────
  readonly endAnchor = viewChild<ElementRef<HTMLDivElement>>('endAnchor');
  readonly textarea = viewChild<ElementRef<HTMLTextAreaElement>>('chatInput');

  constructor() {
    // Autoscroll cuando cambia la lista de mensajes o el estado de espera
    effect(() => {
      // Asignamos a variables locales para que effect rastree las señales
      const _msgs = this.messages();
      const _state = this.uiState();
      if (_msgs !== undefined || _state !== undefined) {
        this.scrollToBottom();
      }
    });

    // Foco inicial en el textarea cuando el componente se renderiza
    afterNextRender(() => {
      this.textarea()?.nativeElement.focus();
    });
  }

  // ── Handlers ────────────────────────────────────────────────────────

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void this.sendMessage();
    }
  }

  handleInput(event: Event): void {
    const ta = event.target as HTMLTextAreaElement;
    this.inputText.set(ta.value);
    this.autoGrowTextarea(ta);
  }

  async sendMessage(): Promise<void> {
    if (!this.canSend()) return;

    const text = this.inputText().trim();
    this.lastUserText.set(text);
    this.addUserMessage(text);
    this.clearInput();
    await this.callApi(text);
  }

  async retryLastMessage(): Promise<void> {
    const text = this.lastUserText();
    if (!text || this.uiState().isWaiting) return;

    // Eliminar el último mensaje del usuario con error y volver a enviarlo
    this.messages.update((msgs) => {
      const lastUserIdx = [...msgs]
        .reverse()
        .findIndex((m) => m.role === 'user' && m.status === 'error');
      if (lastUserIdx === -1) return msgs;
      const realIdx = msgs.length - 1 - lastUserIdx;
      const updated = [...msgs];
      updated.splice(realIdx, 1);
      return updated;
    });

    this.addUserMessage(text);
    await this.callApi(text);
  }

  resetChat(): void {
    this.messages.set([]);
    this.uiState.set({ isWaiting: false, error: null });
    this.lastUserText.set(null);
    this.clearInput();
    afterNextRender(() => {
      this.textarea()?.nativeElement.focus();
    });
  }

  // ── Helpers privados ────────────────────────────────────────────────

  private async callApi(text: string): Promise<void> {
    this.uiState.set({ isWaiting: true, error: null });
    try {
      const payload: SendMessageData = {
        id: environment.idFirestore,
        input: text,
      };
      const { finalOutput } = await this.chatApi.sendToApi(payload);
      this.addAssistantMessage(finalOutput);
      this.uiState.set({ isWaiting: false, error: null });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Ocurrió un error inesperado.';

      // Marcar el último mensaje del usuario como error
      this.messages.update((msgs) =>
        msgs.map((m, i) =>
          i === msgs.length - 1 && m.role === 'user' ? { ...m, status: 'error' as const } : m,
        ),
      );
      this.uiState.set({ isWaiting: false, error: errorMsg });
    }
  }

  private addUserMessage(text: string): void {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user' as Role,
      text,
      ts: Date.now(),
      status: 'sent',
    };
    this.messages.update((msgs) => [...msgs, msg]);
  }

  private addAssistantMessage(text: string): void {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant' as Role,
      text,
      ts: Date.now(),
    };
    this.messages.update((msgs) => [...msgs, msg]);
  }

  private clearInput(): void {
    this.inputText.set('');
    const ta = this.textarea()?.nativeElement;
    if (ta) {
      ta.value = '';
      ta.style.height = 'auto';
    }
  }

  private autoGrowTextarea(ta: HTMLTextAreaElement): void {
    ta.style.height = 'auto';
    const maxHeight = 5 * 24; // ~5 líneas
    ta.style.height = Math.min(ta.scrollHeight, maxHeight) + 'px';
  }

  private scrollToBottom(): void {
    const anchor = this.endAnchor();
    if (!anchor) return;
    // rAF para garantizar que el DOM ya se pintó
    requestAnimationFrame(() => {
      anchor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }

  /** Helper para el template — formatea epoch ms a HH:mm */
  formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
