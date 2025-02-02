import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface DropdownItem {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  hovered?: boolean;
}

export interface DropdownParams {
  options: DropdownItem[];
  selected: EventEmitter<DropdownItem[]>;
  multiple?: boolean;
}

@Component({
  selector: 'ion-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() options: DropdownItem[];
  @Input() multiple?: DropdownParams['multiple'] = false;
  @Output() selected = new EventEmitter<DropdownItem[]>();

  public iconSize = 16;

  private isDisabled(option: DropdownItem) {
    return option.disabled;
  }

  private isSingle() {
    return !this.multiple;
  }

  mouseEnter(option: DropdownItem) {
    option.selected && !option.disabled && (option.hovered = true);
  }

  mouseLeave(option: DropdownItem) {
    option.selected && !option.disabled && (option.hovered = false);
  }

  clearOptions() {
    this.options.forEach((item: DropdownItem) => {
      item.selected = false;
    });
  }

  select(option: DropdownItem) {
    if (this.isDisabled(option)) {
      return;
    }
    if (this.isSingle()) {
      this.clearOptions();
    }
    option.selected = !option.selected;
    this.selected.emit(
      this.options.filter((item: DropdownItem) => item.selected)
    );
  }
}
