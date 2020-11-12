import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router) {}

  canActivate(_: any, state: RouterStateSnapshot): boolean {
    return this.checkIfCanNavigate(state.url);
  }

  private checkIfCanNavigate(url): boolean {
    if (this.auth.isAuthenticated) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: {
        redirect: this.router.url,
      },
    });
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router) {}

  canActivate(_: any, state: RouterStateSnapshot): boolean {
    return this.checkIfCanNavigate();
  }

  private checkIfCanNavigate(): boolean {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/rentals']);
      return false;
    }

    return true;
  }
}
