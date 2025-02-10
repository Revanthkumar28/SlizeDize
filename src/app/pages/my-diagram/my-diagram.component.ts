import { Component, Input,Output,EventEmitter } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'b2b-my-diagram',
  templateUrl: './my-diagram.component.html',
  styleUrls: ['./my-diagram.component.css']
})
export class MyDiagramComponent {

  private _selectedNode: go.Node | null = null; // Initialize with null
  public data = {
    name: null,
    parent: null
  };

  @Input()
  model: go.Model = new go.Model;

  @Input()
  get selectedNode() { return this._selectedNode; }
  set selectedNode(node: go.Node | null) { // Adjust the type to accept null
    if (node && node !== null) { // Check for null explicitly
      this._selectedNode = node;
      this.data.name = this._selectedNode.data.name;
      this.data.parent = this._selectedNode.data.parent;
      console.log(this.data)
    } else {
      this._selectedNode = null;
    }
  }

  constructor() { }
  

  public onCommitForm() {
    if (this._selectedNode && this._selectedNode !== null) { // Check for null explicitly
      this.model.startTransaction();
      this.model.set(this._selectedNode.data, 'name', this.data.name);
      this.model.set(this._selectedNode.data, 'parent', this.data.parent);
      this.model.commitTransaction();
      console.log(this.data)
      
    }
  }
  
}
