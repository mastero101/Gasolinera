import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    } else {
      alert('No estas autorizado')
      this.router.navigate(['/login']);
      return false;
    }
  }
}
