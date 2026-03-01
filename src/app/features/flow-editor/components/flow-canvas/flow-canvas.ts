import { Component, computed, inject } from '@angular/core';
import { Connection, NodeSelectedChange, Vflow } from 'ngx-vflow';
import { NodesService } from '../../../../core/nodes-service';
import { CatalogsNode } from '../catalogs-node/catalogs-node';
import { NodeConfig } from '../node-config/node-config';
import { RulesNodeService } from '../../../../core/rules-node-service';
import { NodeType } from '../../../../models/nodes.model';

@Component({
  selector: 'app-flow-canvas',
  imports: [Vflow, CatalogsNode, NodeConfig],
  templateUrl: './flow-canvas.html',
  styleUrl: './flow-canvas.css',
})
export class FlowCanvas {
  private readonly nodesService = inject(NodesService);
  private readonly rulesNodeService = inject(RulesNodeService);

  public nodes = computed(() => this.nodesService.nodes());
  public edges = computed(() => this.nodesService.edges());

  public createEdge({ source, target }: Connection) {
    if (source && target) {
      const sourceNode = this.nodes().find((n) => n.id === source);
      const targetNode = this.nodes().find((n) => n.id === target);

      if (sourceNode && targetNode) {
        const isAllowed = this.rulesNodeService.rules(
          sourceNode.id as NodeType,
          targetNode.id as NodeType,
        );
        if (!isAllowed) {
          return;
        }
      }
    }

    this.nodesService.edges.update((edges) => [
      ...edges,
      {
        id: `${source} -> ${target}`,
        source,
        target,
      },
    ]);
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    const nodeType = event.dataTransfer?.getData('nodeType');

    this.nodesService.createNode(nodeType ?? 'default');
    console.log(
      `Nodo soltado en flow-canvas → tipo: "${nodeType}" en (x: ${event.offsetX}, y: ${event.offsetY})`,
    );
  }

  public selectNode(nodeId: NodeSelectedChange[]): void {
    console.log(nodeId);
  }

  public onSave(): void {
    console.log(
      'Evento save recibido en FlowCanvas — flujo listo para guardar.',
      this.nodes(),
      this.edges(),
    );
    this.createFlow();
  }

  private createFlow(): void {
    this.nodesService.saveFLow();
  }
}
