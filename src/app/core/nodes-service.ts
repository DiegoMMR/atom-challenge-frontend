import { inject, Injectable, signal } from '@angular/core';
import { Edge, Node } from 'ngx-vflow';
import { NodeBase } from '../features/flow-editor/components/node-base/node-base';
import { INodeConfig, NodePorts } from '../models/node-config.model';
import { NodeType } from '../models/nodes.model';
import { SendFlow } from '../models/send-flow.mode';
import { environment } from '../../environments/environment.development';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})
export class NodesService {
  public nodes = signal<Node[]>([]);
  public edges = signal<Edge[]>([]);
  public selectedNodeId = signal<string | null>(null);
  private readonly apiService = inject(Api);

  private nodeConfig(id: string): Node {
    const uuid = crypto.randomUUID();
    const length = this.nodes().length;
    const point = signal({ x: 100 + length * 20, y: 100 + length * 20 });

    return {
      id: `node-${id}_${uuid}`,
      point,
      type: NodeBase,
      data: signal(id as NodeType),
    };
  }

  public createNode(id: string) {
    this.nodes.update((nodes) => [...nodes, this.nodeConfig(id)]);
  }

  public deleteNode(nodeId: string): void {
    this.nodes.update((nodes) => nodes.filter((n) => n.id !== nodeId));
    this.edges.update((edges) => edges.filter((e) => e.source !== nodeId && e.target !== nodeId));
    this.selectedNodeId.set(null);
  }

  private createFlow(): SendFlow {
    const nodes: INodeConfig[] = [];
    console.log('crear final');

    for (const node of this.nodes()) {
      const outEdges = this.edges().filter((e) => e.source === node.id);
      const memoryMap = new Map<string, INodeConfig>();
      const out = outEdges.flatMap((e) => {
        // validar si el nodo es memoria, si es así, no crear conexión directa sino una conexión a un nodo de tipo "memory" intermedio

        const targetNode = this.nodes().find((n) => {
          if (n.id.includes('memory')) {
            if (!memoryMap.has(n.id)) {
              memoryMap.set(n.id, {
                id: n.id,
                type: n.type,
                typeNode: n.id.split('_')[0].replace('node-', ''),
                ports: { in: [], out: [] },
                position: n.point(),
              });
            }
            return false;
          }
          return n.id === e.target;
        });
        return targetNode ? [{ id: targetNode.id }] : [];
      });
      const ports: NodePorts = { in: [], out, memory: [...memoryMap.values()] };
      nodes.push({
        id: node.id,
        type: node.type,
        typeNode: node.id.split('_')[0].replace('node-', ''),
        ports,
        position: node.point(),
      });
    }

    console.log(nodes);

    return {
      id: environment.idFirestore,
      flow: nodes,
    };
  }

  public saveFLow() {
    const flow = this.createFlow();
    this.apiService
      .saveFlow(flow)
      .then((response) => {
        alert('Flujo guardado exitosamente!');
        console.log('Flow saved successfully:', response);
      })
      .catch((error) => {
        console.error('Error saving flow:', error);
      });
  }

  public async getNodesSaved(): Promise<void> {
    try {
      const configs = await this.apiService.getFlows();
      this.loadFromConfigs(configs);
    } catch (error) {
      console.error('Error retrieving nodes:', error);
    }
  }

  public loadFromConfigs(configs: INodeConfig[]): void {
    // ── Nodos ────────────────────────────────────────────────────────
    // Incluye tanto los nodos principales como los nodos de memoria
    // embebidos en ports.memory de cada nodo.
    const allConfigs: INodeConfig[] = [...configs, ...configs.flatMap((c) => c.ports.memory ?? [])];

    // Deduplicar por id (por si algún nodo memory aparece varias veces)
    const seen = new Set<string>();
    const uniqueConfigs = allConfigs.filter((c) => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });

    const nodes: Node[] = uniqueConfigs.map((c) => ({
      id: c.id,
      point: signal({ x: c.position.x, y: c.position.y }),
      type: NodeBase,
      data: signal(c.typeNode as NodeType),
    }));

    // ── Edges ────────────────────────────────────────────────────────
    // ports.out → aristas directas; ports.memory → aristas hacia nodos memoria
    const edges: Edge[] = configs.flatMap((c) => {
      const outEdges: Edge[] = (c.ports.out ?? []).map((port) => ({
        id: `edge-${c.id}-${port.id}`,
        source: c.id,
        target: port.id,
      }));

      const memoryEdges: Edge[] = (c.ports.memory ?? []).map((memNode) => ({
        id: `edge-${c.id}-${memNode.id}`,
        source: c.id,
        target: memNode.id,
      }));

      return [...outEdges, ...memoryEdges];
    });

    this.nodes.set(nodes);
    this.edges.set(edges);
    this.selectedNodeId.set(null);
  }
}
