import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  // styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent<T> {

  @Input()
  label: string;

  @Input()
  values: T[];

  @Input()
  multiple = true;

  @Output()
  onDropdownChanged = new EventEmitter<T>();

  constructor() {
  }

  onSelectionChanged(newSelection: T) {
    this.onDropdownChanged.emit(newSelection);
  }
}
