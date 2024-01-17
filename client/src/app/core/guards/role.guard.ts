import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user: any = null;
    const storedUser = localStorage.getItem('user');

    if (storedUser !== null) {
      user = JSON.parse(storedUser);
    } else {
      // Handle the case when 'user' is not available in localStorage
      console.warn("No user data found in localStorage");
    }

    if (user && user.role) {
      if (user.role === 'admin') {
        return true;
      } else {
        if(state.url.includes('create') || state.url.includes('edit')) {
          this.router.navigate([`/dashboard/${route.routeConfig!.path}`]);
          return false;
        }
        return true;
      }
    }

    return true;
  }
}
