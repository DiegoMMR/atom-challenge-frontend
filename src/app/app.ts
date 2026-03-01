import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly title = signal('atom-challenge-frontend');
  protected readonly apiBaseUrl = environment.apiBaseUrl;
  protected readonly flowResultText = signal('Loading...');

  ngOnInit(): void {
    this.http.get<unknown>(`${this.apiBaseUrl}/flow`).subscribe({
      next: (result) => {
        const formattedResult =
          typeof result === 'string' ? result : JSON.stringify(result, null, 2);

        this.flowResultText.set(formattedResult);
        console.log('GET /flow result:', result);
      },
      error: (error) => {
        const message = error?.message ?? 'Request failed';
        this.flowResultText.set(`Error: ${message}`);
        console.error('GET /flow error:', error);
      }
    });
  }
}
