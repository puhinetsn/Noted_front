import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Sidebar } from './app/layout/sidebar/sidebar';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
