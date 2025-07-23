import { Component, input, signal } from '@angular/core';
import { ColorPickerDirective } from 'ngx-color-picker';
import { Status } from '../../../models/status.type';

@Component({
  selector: 'app-status-chip',
  imports: [ColorPickerDirective],
  templateUrl: './status-chip.html',
  styleUrl: './status-chip.scss',
})
export class StatusChip {
  color = '#5071b7';
  status = input.required<Status>();
  editable = input(false);
  chipName = signal('test');

  blockKeyboardEvent(event: KeyboardEvent): void {
    event.preventDefault();
  }
}
