import { Component, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  mode: MatDrawerMode = 'side';
  opened: boolean = true;

  toggleSidenav() {
    this.opened = !this.opened;
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}

