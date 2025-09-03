import { Component } from '@angular/core';
import { AdminsService } from '../services/admins.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private adminsService: AdminsService, private router: Router) {}

  admin_username: string = ""
  admin_password: string = ""
  output: string = ""

  login() {
    if (this.admin_username == "") {
      this.output = "Username not entered.";
    } else if (this.admin_password == "") {
      this.output = "Password not entered.";
    } else {
      this.output = "";
      this.adminsService.login(this.admin_username, this.admin_password).subscribe(data => {
        if (data != null) {
          localStorage.setItem("logged_in", JSON.stringify(data));
          this.router.navigate(["admin"]);
        }
      });
    }
  }
}
