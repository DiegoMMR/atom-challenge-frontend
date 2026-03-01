import { Component, computed, output } from '@angular/core';
import { NodeCatalogItem, NodeType, NODE_META, NODE_TYPES } from '../../../../models/nodes.model';

@Component({
  selector: 'app-catalogs-node',
  imports: [],
  templateUrl: './catalogs-node.html',
  styleUrl: './catalogs-node.css',
})
export class CatalogsNode {
  public readonly save = output<void>();

  public readonly nodeCatalog = computed<NodeCatalogItem[]>(() =>
    NODE_TYPES.map((type) => ({ type, ...NODE_META[type] })),
  );

  public onDragStart(event: DragEvent, nodeType: NodeType): void {
    event.dataTransfer?.setData('nodeType', nodeType);
  }

  public onSave(): void {
    console.log('Guardar flujo emitido desde CatalogsNode');
    this.save.emit();
  }
}
