import { Component } from '@angular/core';
import { User } from '../models/user';
import { UsersServiceService } from '../services/users-service.service';
import { Router } from '@angular/router';
import { CottagesService } from '../services/cottages.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private usersService: UsersServiceService, private cottagesService: CottagesService, private router: Router) {}

  awaiting_users: User[] = [];
  tourists: User[] = [];
  owners: User[] = [];


  output = "";

  ngOnInit() {
    this.awaiting_users = [];
    this.tourists = [];
    this.owners = [];

    this.usersService.getAwaitingUsers().subscribe(data => {
      if (data.length > 0) {
        this.awaiting_users = data;
      }
    })
    this.usersService.getAcceptedTourists().subscribe(data => {
      if (data.length > 0) {
        this.tourists = data;
      }
    })
    this.usersService.getAcceptedOwners().subscribe(data => {
      if (data.length > 0) {
        this.owners = data;
      }
    })
  }

  accept(user: User) {
    this.usersService.acceptAwaitingUser(user.user_username).subscribe(data => {
      if (data) this.ngOnInit();
    })
  }

  reject(user: User) {
    this.usersService.rejectAwaitingUser(user.user_username).subscribe(data => {
      if (data) this.ngOnInit();
    })
  }

  editUser(user: User) {
    localStorage.setItem("selected_user", JSON.stringify(user));
    this.router.navigate(["edit_user"]);
  }

  deactivateUser(user: User) {
    this.usersService.deactivateUser(user).subscribe( data => {
      if (data) {
        if (user.user_type == "owner") {
          this.cottagesService.deleteOwnersCottages(user.user_username).subscribe( data => {});
        }
        this.ngOnInit();
      }
    });
  }

  goToHomepage() {
    localStorage.removeItem("logged_in");
    this.router.navigate([""]);
  }
}
