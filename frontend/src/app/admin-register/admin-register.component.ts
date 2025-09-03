import { Component } from '@angular/core';
import { AdminsService } from '../services/admins.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {

  constructor(private adminsService: AdminsService, private router: Router) {}
  
  admin_username: string = ""
  admin_password: string = ""
  output: string = ""

  register() {
    if (this.admin_username == "") {
      this.output = "Username not entered.";
    } else if (this.admin_password == "") {
      this.output = "Password not entered.";
    } else {
      this.output = "";
      this.adminsService.register(this.admin_username, this.admin_password).subscribe( data => {
        if (data != null) {
          this.router.navigate(["admin_login"]);
        }
      });
    }
  }
}
