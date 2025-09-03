import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem("logged_in");
    localStorage.removeItem("selected_cottage");
    this.router.navigate([""]);
  }
}
