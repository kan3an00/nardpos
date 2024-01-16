import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true
})
export class SidebarComponent {
  navigation = [
    { name: 'Home', href: '/home', icon: 'home', current: true },
    { name: 'About', href: '/about', icon: 'info', current: false },
    // Add more navigation items as needed
  ];
}
