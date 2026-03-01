import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomNodeComponent, HandleComponent } from 'ngx-vflow';

@Component({
  selector: 'app-node-end',
  imports: [HandleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative flex items-center justify-center w-36 h-12 rounded-full bg-rose-700 border-2 border-rose-400 shadow-xs shadow-rose-900/40 select-none"
    >
      <span class="text-white font-bold text-sm tracking-widest uppercase">Fin</span>

      <!-- Solo punto de entrada (target) -->
      <handle position="top" type="target" />
    </div>
  `,
})
export class NodeEnd extends CustomNodeComponent {}
