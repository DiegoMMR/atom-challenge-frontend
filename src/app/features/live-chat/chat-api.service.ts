import { inject, Injectable } from '@angular/core';
import { Api } from '../../core/api';
import { LiveChatResponse, SendMessageData } from './chat.models';

@Injectable({ providedIn: 'root' })
export class ChatApiService {
  private readonly api = inject(Api);

  sendToApi(data: SendMessageData): Promise<LiveChatResponse> {
    return this.api.sendMessage(data);
  }
}
