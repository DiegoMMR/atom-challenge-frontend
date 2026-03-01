import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { SendFlow } from '../models/send-flow.mode';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly baseUrl = environment.baseUrl;
  private readonly httpService = inject(HttpClient);

  public async saveFlow(flow: SendFlow): Promise<object> {
    const url = `${this.baseUrl}${environment.saveFlow}`;

    return lastValueFrom(this.httpService.post(url, flow));
  }
}
