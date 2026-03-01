import { Component } from '@angular/core';
import { addEdge, Connection } from '@xyflow/react'; // Import utilities from upstream
import { XYFlowModule } from 'ngx-xyflow';

@Component({
  selector: 'app-node-one',
  imports: [XYFlowModule],
  templateUrl: './node-one.html',
  styleUrl: './node-one.css',
})
export class NodeOne {
  nodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  edges = [{ id: 'e1-2', source: '1', target: '2' }];

  onConnect(connection: Connection) {
    this.edges = addEdge(connection, this.edges);
  }
}
