import { Component, input, signal } from '@angular/core';
import { ColorPickerDirective } from 'ngx-color-picker';
import { Status } from '../../../models/status.type';

@Component({
  selector: 'app-status-chip',
  imports: [],
  templateUrl: './status-chip.html',
  styleUrl: './status-chip.scss',
})
export class StatusChip {
  status = input.required<Status>();
}
