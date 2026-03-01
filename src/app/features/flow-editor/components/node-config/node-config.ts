import { Component, computed, inject } from '@angular/core';
import { NodesService } from '../../../../core/nodes-service';
import { NODE_META, NodeCatalogItem, NodeType } from '../../../../models/nodes.model';

@Component({
  selector: 'app-node-config',
  imports: [],
  templateUrl: './node-config.html',
  styleUrl: './node-config.css',
})
export class NodeConfig {
  private readonly nodeService = inject(NodesService);

  public readonly isNodeSelected = computed(() => !!this.nodeService.selectedNodeId());

  public readonly selectedNodeMeta = computed<(NodeCatalogItem & { nodeId: string }) | null>(() => {
    const nodeId = this.nodeService.selectedNodeId();
    if (!nodeId) return null;

    // Extract type from id pattern: "node-<type>_<uuid>"
    const rawType = nodeId.split('_')[0].replace('node-', '') as NodeType;
    const meta = NODE_META[rawType];
    if (!meta) return null;

    return { ...meta, type: rawType, nodeId };
  });

  public deleteSelectedNode(): void {
    const nodeId = this.nodeService.selectedNodeId();
    if (nodeId) {
      this.nodeService.deleteNode(nodeId);
    }
  }
}
