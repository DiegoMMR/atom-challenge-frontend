import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { CustomNodeComponent, HandleComponent, SelectableDirective } from 'ngx-vflow';
import {
  HandlePosition,
  HandleType,
  NODE_META,
  NodeHandleConfig,
  NodeType,
} from '../../../../models/nodes.model';
import { NodesService } from '../../../../core/nodes-service';

interface ResolvedHandle {
  position: HandlePosition;
  type: HandleType;
}

/** Tipos por defecto cuando se pasa `true` en lugar de NodeHandleConfig */
const DEFAULT_HANDLE_TYPES: Record<HandlePosition, HandleType> = {
  right: 'source',
  bottom: 'source',
  left: 'target',
  top: 'target',
};

@Component({
  selector: 'app-node-base',
  imports: [HandleComponent, SelectableDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (meta(); as m) {
      <div
        selectable
        class="relative w-44 rounded-xl bg-gray-900 border shadow-xl select-none overflow-hidden"
        [class]="m.theme.cardBorder"
      >
        <!-- Header -->
        <div
          class="flex items-center gap-2 px-3 py-2 border-b"
          [class]="m.theme.headerBg + ' ' + m.theme.headerBorder"
        >
          <div
            class="flex items-center justify-center w-6 h-6 rounded-md shrink-0"
            [class]="m.theme.iconBg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="m.iconPath" />
            </svg>
          </div>

          <span class="font-semibold text-xs tracking-wide uppercase" [class]="m.theme.labelColor">
            {{ m.label }}
          </span>

          <span
            class="ml-auto w-1.5 h-1.5 rounded-full animate-pulse"
            [class]="m.theme.pulseColor"
          ></span>
        </div>

        <!-- Body -->
        <div class="px-3 py-2.5 flex flex-col gap-1">
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full shrink-0" [class]="m.theme.dotColor"></span>
            <span class="text-gray-400 text-xs">{{ m.description }}</span>
          </div>
          <div class="mt-1 flex gap-1">
            <div class="h-1.5 flex-1 rounded-full" [class]="m.theme.bar1"></div>
            <div class="h-1.5 flex-2 rounded-full" [class]="m.theme.bar2"></div>
            <div class="h-1.5 w-3 rounded-full" [class]="m.theme.bar1"></div>
          </div>
        </div>

        <!-- Handles dinámicos desde NODE_META -->
        @for (h of handles(); track h.position) {
          <handle [position]="h.position" [type]="h.type" />
        }
      </div>
    }
  `,
})
export class NodeBase extends CustomNodeComponent<NodeType> {
  private readonly nodesService = inject(NodesService);

  protected readonly nodeType = computed(() => this.data() ?? 'generic');
  protected readonly meta = computed(() => NODE_META[this.nodeType()]);

  protected readonly handles = computed<ResolvedHandle[]>(() => {
    const rawHandles = this.meta().handles;
    return (Object.entries(rawHandles) as [HandlePosition, NodeHandleConfig | true][]).map(
      ([pos, val]) =>
        val === true ? { position: pos, type: DEFAULT_HANDLE_TYPES[pos] } : (val as ResolvedHandle),
    );
  });

  constructor() {
    super();
    effect(
      () => {
        const id = this.node().id;
        const isSelected = this.selected();
        if (isSelected) {
          console.log('Nodo seleccionado:', id);
          this.nodesService.selectedNodeId.set(id);
        } else if (this.nodesService.selectedNodeId() === id) {
          this.nodesService.selectedNodeId.set(null);
        }
      },
      { allowSignalWrites: true },
    );
  }
}
