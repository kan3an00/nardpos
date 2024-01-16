import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';;

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    standalone: true,
    imports: [
        NgClass,
        RouterLink,
    ],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;

  constructor() {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
