import { Component } from '@angular/core';

@Component({
  selector: 'app-node-one',
  imports: [],
  templateUrl: './node-one.html',
  styleUrl: './node-one.css',
})
export class NodeOne {
  changes(): void {
    console.log('Changes');
  }
}
