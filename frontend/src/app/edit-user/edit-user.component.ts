import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UsersServiceService } from '../services/users-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  selectedUser: User = new User();
  credit_card_type = "";
  output = "";

  constructor(private usersService: UsersServiceService ,private router: Router) {}

  ngOnInit() {
    let selected = localStorage.getItem("selected_user");
    if (selected) {
      this.selectedUser = JSON.parse(selected);
    }
    this.determineCreditCardType(this.selectedUser.credit_card_number)
  }

  determineCreditCardType(credit_card_number: string) {
    if ((credit_card_number.startsWith("300") || credit_card_number.startsWith("301") || credit_card_number.startsWith("302") ||
      credit_card_number.startsWith("303") || credit_card_number.startsWith("36") || credit_card_number.startsWith("38")) &&
      credit_card_number.length == 15)
    {
      this.credit_card_type = "diners";
    } else if ((credit_card_number.startsWith("51") || credit_card_number.startsWith("52") || credit_card_number.startsWith("53") ||
      credit_card_number.startsWith("54") || credit_card_number.startsWith("55")) && credit_card_number.length == 16)
    {
      this.credit_card_type = "mastercard";
    } else if ((credit_card_number.startsWith("4539") || credit_card_number.startsWith("4556") || credit_card_number.startsWith("4916") ||
      credit_card_number.startsWith("4532") || credit_card_number.startsWith("4929") || credit_card_number.startsWith("4485") ||
       credit_card_number.startsWith("4716")) && credit_card_number.length == 16)
    {
      this.credit_card_type = "visa";
    } else {
      this.credit_card_type = "";
    }
  }

  back() {
    localStorage.removeItem("selected_user");
    this.router.navigate(["admin"]);
  }

  edit() {
    if (this.selectedUser.user_firstname == "") {
      this.output = "First name not entered."
    } else if (this.selectedUser.user_lastname == "") {
      this.output = "Last name not entered."
    } else if (this.selectedUser.gender == "") {
      this.output = "Gender not entered."
    } else if (this.selectedUser.address == "") {
      this.output = "Address not entered."
    } else if (this.selectedUser.contact_number == "") {
      this.output = "Contact number not entered."
    } else if (this.selectedUser.email == "") {
      this.output = "Email not entered."
    } else if (this.selectedUser.credit_card_number == "") {
      this.output = "Credit card number not entered."
    } else if (this.credit_card_type == "") {
      this.output = "Credit card number not valid."
    } else {
      this.output = "";
      this.usersService.editUser(this.selectedUser).subscribe( data => {
        if (data) this.back();
      });
    }
  }
}
