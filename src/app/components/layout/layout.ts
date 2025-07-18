import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { ProjectList } from '../project/project-list/project-list';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ProjectList,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  readonly isMobile = signal(true);
  private readonly _mobileQuery: MediaQueryList;
  private destroyRef = inject(DestroyRef);
  private readonly _mobileQueryListener: () => void;

  sidenavOpened = false;

  constructor() {
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 720px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this._mobileQuery.removeEventListener(
        'change',
        this._mobileQueryListener
      );
    });
  }

  toggleSidenav(snav: MatSidenav) {
    if (this.isMobile()) {
      this.sidenavOpened = !this.sidenavOpened;
      snav.toggle();
    }
  }
}
