import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomNodeComponent, HandleComponent } from 'ngx-vflow';

@Component({
  selector: 'app-node-memory',
  imports: [HandleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative w-44 rounded-xl bg-gray-900 border border-purple-700/60 shadow-xl shadow-purple-950/50 select-none overflow-hidden"
    >
      <!-- Header -->
      <div class="flex items-center gap-2 px-3 py-2 bg-purple-700/20 border-b border-purple-700/40">
        <div class="flex items-center justify-center w-6 h-6 rounded-md bg-purple-600/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
            />
          </svg>
        </div>
        <span class="text-purple-200 font-semibold text-xs tracking-wide uppercase">Memory</span>
        <!-- indicador de estado -->
        <span class="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
      </div>

      <!-- Body -->
      <div class="px-3 py-2.5 flex flex-col gap-1">
        <div class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          <span class="text-gray-400 text-xs">Almacenamiento de contexto</span>
        </div>
        <div class="mt-1 flex gap-1">
          <div class="h-1.5 flex-1 rounded-full bg-purple-600/50"></div>
          <div class="h-1.5 flex-2 rounded-full bg-purple-500/30"></div>
          <div class="h-1.5 w-3 rounded-full bg-purple-700/40"></div>
        </div>
      </div>

      <!-- Handles -->
      <handle position="left" type="target" />
      <handle position="right" type="source" />
    </div>
  `,
})
export class NodeMemory extends CustomNodeComponent {}
