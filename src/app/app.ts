import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'front';
}
