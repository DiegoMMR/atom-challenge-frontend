import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, signal, TemplateRef, viewChild } from '@angular/core';
import { addEdge, Connection, Node } from '@xyflow/react';
import { XYFlowModule } from 'ngx-xyflow';

@Component({
  selector: 'app-node-one',
  imports: [XYFlowModule, DecimalPipe],
  templateUrl: './node-one.html',
  styleUrl: './node-one.css',
})
export class NodeOne {
  flowWrapper = viewChild<ElementRef<HTMLDivElement>>('flowWrapper');
  textUpdater = viewChild<TemplateRef<HTMLElement>>('textUpdater');

  private nodeIdCounter = 3;

  selectedNode = signal<Node | null>(null);

  nodes = signal<Node[]>([
    { id: '1', position: { x: 80, y: 80 }, data: { label: 'Nodo 1' }, className: 'bg-blue-500' },
    { id: '2', position: { x: 80, y: 200 }, data: { label: 'Nodo 2' }, className: 'bg-green-500' },
    {
      id: '3',
      type: 'textUpdater',
      position: { x: 80, y: 200 },
      data: { label: 'Nodo 2' },
      className: 'bg-green-500',
    },
  ]);

  nodeTypes = signal([
    {
      textUpdater: this.textUpdater,
    },
  ]);

  edges = signal([{ id: 'e1-2', source: '1', target: '2' }]);

  onConnect(connection: Connection) {
    this.edges.update((e) => addEdge(connection, e));
    console.log('contectado');
  }

  onNodeClick(event: any[]) {
    this.selectedNode.set(event[1]);
  }

  onDragStart(event: DragEvent, nodeType: string) {
    event.dataTransfer?.setData('application/node-type', nodeType);
    event.dataTransfer!.effectAllowed = 'move';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const type = event.dataTransfer?.getData('application/node-type');
    if (!type) return;

    const bounds = this.flowWrapper()?.nativeElement.getBoundingClientRect();
    if (!bounds) return;

    const position = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };

    const id = String(this.nodeIdCounter++);
    const newNode: Node = { id, type, position, data: { label: `Nodo ${id}` } };

    this.nodes.update((n) => [...n, newNode]);
  }
}
