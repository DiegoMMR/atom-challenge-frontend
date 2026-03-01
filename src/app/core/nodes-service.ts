import { Injectable, signal } from '@angular/core';
import { Edge, Node } from 'ngx-vflow';
import { NodeEnd } from '../features/flow-editor/components/node-end/node-end';
import { NodeInit } from '../features/flow-editor/components/node-init/node-init';
import { INodeConfig, NodePorts } from '../models/node-config.model';

@Injectable({
  providedIn: 'root',
})
export class NodesService {
  public nodes = signal<Node[]>([]);
  public edges = signal<Edge[]>([]);

  private nodeConfig(id: string): Node {
    const uuid = crypto.randomUUID();
    const lenght = this.nodes().length;
    const point = signal({
      x: 100 + lenght * 20,
      y: 100 + lenght * 20,
    });

    const base = { id: `node-${id}-${uuid}`, point };

    if (id === 'init') return { ...base, type: NodeInit };
    if (id === 'end') return { ...base, type: NodeEnd };

    return { ...base, type: 'default', text: signal(`${id}`) };
  }

  public createNode(id: string) {
    this.nodes.update((nodes) => [...nodes, this.nodeConfig(id)]);
  }

  public createFlow() {
    const nodes: INodeConfig[] = [];
    console.log('crear final');

    for (const node of this.nodes()) {
      const outEdges = this.edges().filter((e) => e.source === node.id);
      const out = outEdges.flatMap((e) => {
        const targetNode = this.nodes().find((n) => n.id === e.target);
        return targetNode ? [{ id: targetNode.id }] : [];
      });
      const ports: NodePorts = { in: [], out };
      nodes.push({
        id: node.id,
        type: node.type,
        typeNode: node.id,
        ports,
        position: node.point(),
      });
    }

    console.log(nodes);
  }
}
