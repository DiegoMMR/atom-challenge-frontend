import { Injectable, signal } from '@angular/core';
import { Edge, Node } from 'ngx-vflow';

@Injectable({
  providedIn: 'root',
})
export class NodesService {
  public nodes = signal<Node[]>([]);
  public edges = signal<Edge[]>([]);

  private nodeConfig(id: string): Node {
    const lenght = this.nodes().length;
    const point = signal({
      x: 100 + lenght * 20,
      y: 100 + lenght * 20,
    });

    return {
      id: id,
      point,
      type: 'default',
      text: signal(`${id}`),
    };
  }

  public createNode(id: string) {
    this.nodes.update((nodes) => [...nodes, this.nodeConfig(id)]);
  }
}
