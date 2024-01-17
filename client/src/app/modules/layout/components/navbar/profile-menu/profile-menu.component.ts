import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';import { AngularSvgIconModule } from 'angular-svg-icon';
;

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    standalone: true,
    imports: [
        NgClass,
        RouterLink,
        AngularSvgIconModule
    ],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;
  public user: any;

  constructor(private readonly _router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      this.user = JSON.parse(storedUser);
    } else {
      // Handle the case when 'user' is not available in localStorage
      console.warn("No user data found in localStorage");
    }
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public signOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this._router.navigate(['/auth/sign-in']);
  }
}
