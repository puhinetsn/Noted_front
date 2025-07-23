import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-status',
  imports: [FormsModule],
  templateUrl: './create-status.html',
  styleUrl: './create-status.scss',
})
export class CreateStatus {
  name = signal<string>('');
  color = signal<string>('#5071b7');
  saveStatus = output<{ name: string; color: string }>();

  onSaveStatus() {
    this.saveStatus.emit({ name: this.name(), color: this.color() });
  }

  blockKeyboardEvent(event: KeyboardEvent): void {
    event.preventDefault();
  }
}
