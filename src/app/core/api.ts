import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LiveChatResponse, SendMessageData } from '../models/live-chat.model';
import { SendFlow } from '../models/send-flow.mode';
import { INodeConfig } from '../models/node-config.model';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly baseUrl = environment.baseUrl;
  private readonly httpService = inject(HttpClient);

  public async getFlows(): Promise<INodeConfig[]> {
    const url = `${this.baseUrl}${environment.getFlow}`;

    return lastValueFrom(this.httpService.get<INodeConfig[]>(url));
  }

  public async saveFlow(flow: SendFlow): Promise<object> {
    const url = `${this.baseUrl}${environment.saveFlow}`;

    return lastValueFrom(this.httpService.post(url, flow));
  }

  public async sendMessage(data: SendMessageData): Promise<LiveChatResponse> {
    const url = `${this.baseUrl}${environment.sendMessage}`;

    return lastValueFrom(this.httpService.post<LiveChatResponse>(url, data));
  }
}
