import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy{
  @ViewChild('drawer') drawer!: MatSidenav;

  mode: MatDrawerMode = 'side';
  opened: boolean = true;
  isAuthenticated: boolean = false;
  private authStatusSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authStatusSubscription = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }

  toggleSidenav() {
    this.opened = !this.opened;
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

