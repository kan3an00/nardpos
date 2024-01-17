import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let user: any = null;
    const storedUser = localStorage.getItem('user');

    if (storedUser !== null) {
      user = JSON.parse(storedUser);
    } else {
      // Handle the case when 'user' is not available in localStorage
      console.warn("No user data found in localStorage");
    }

    // Check if the user exists and has a role
    if (user && user.role) {
      if (user.role === 'admin') {
        return true;
      }
    }

    // If user or role is not available, redirect to login
    this.router.navigate(['/auth/sign-in']);
    return false;
  }
}
