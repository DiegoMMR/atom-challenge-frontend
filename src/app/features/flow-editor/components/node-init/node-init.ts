import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomNodeComponent, HandleComponent } from 'ngx-vflow';

@Component({
  selector: 'app-node-init',
  imports: [HandleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative flex items-center justify-center w-36 h-12 rounded-full bg-teal-600 border-2 border-teal-400 shadow-xs shadow-teal-900/40 select-none"
    >
      <span class="text-white font-bold text-sm tracking-widest uppercase">Inicio</span>

      <!-- Solo punto de salida (source) -->
      <handle position="bottom" type="source" />
    </div>
  `,
})
export class NodeInit extends CustomNodeComponent {}
