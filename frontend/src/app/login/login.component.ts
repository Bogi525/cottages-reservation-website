import { Component } from '@angular/core';
import { UsersServiceService } from '../services/users-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ""
  password: string = ""
  output: string = ""

  constructor(private router: Router, private usersService: UsersServiceService) {}

  login() {
    const passwordRegex = /^(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z].{4,8}$/;

    if (this.username == "") {
      this.output = "Username not entered.";

    } else if (this.password == "") {
      this.output = "Password not entered.";

    } else if (!passwordRegex.test(this.password)) {
      this.output = "Password format invalid.";

    } else {
      this.usersService.login(this.username, this.password).subscribe(data => {
        if (data == null) {
          this.output = "Credentials don't match."

        } else {
          localStorage.setItem("logged_in", JSON.stringify(data));

          if (data.user_type == "tourist") {
            this.router.navigate(["/tourist"]);

          } else if (data.user_type == "owner") {
            this.router.navigate(["/owner"]);
          }
        }
      })
    }
  }
}
