import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/guards/auth.guard';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  providers: [AuthService, AuthGuard]
})
export class AppComponent {
  title = 'client';
}
