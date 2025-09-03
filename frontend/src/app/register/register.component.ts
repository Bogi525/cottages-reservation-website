import { Component } from '@angular/core';
import { UsersServiceService } from '../services/users-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user_type: string = ""
  user_username: string = ""
  user_password: string = ""
  user_firstname: string = ""
  user_lastname: string = ""
  gender: string = ""
  address: string = ""
  contact_number: string = ""
  email: string = ""
  profile_picture: File | null = null
  credit_card_number: string = ""
  output: string = ""

  constructor(private usersService: UsersServiceService, private router: Router) {}

  credit_card_type = "";

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

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.profile_picture = target.files[0];

      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width < 100 || height < 100 || width > 300 || height > 300) {
          alert("Image must be between 100x100 and 300x300 pixels.");
          this.profile_picture = null;
          target.value = "";
        }
      };
      img.src = URL.createObjectURL(this.profile_picture);
    }
  }

  register() {
    const passwordRegex = /^(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z].{4,8}$/;

    if (this.user_type == "") {
      this.output = "User type not entered."
    } else if (this.user_username == "") {
      this.output = "Username not entered."
    } else if (this.user_password == "") {
      this.output = "Password not entered."
    } else if (!passwordRegex.test(this.user_password)) {
      this.output = "Password format invalid." + this.user_password;
    } else if (this.user_firstname == "") {
      this.output = "First name not entered."
    } else if (this.user_lastname == "") {
      this.output = "Last name not entered."
    } else if (this.gender == "") {
      this.output = "Gender not entered."
    } else if (this.address == "") {
      this.output = "Address not entered."
    } else if (this.contact_number == "") {
      this.output = "Contact number not entered."
    } else if (this.email == "") {
      this.output = "Email not entered."
    } else if (this.credit_card_number == "") {
      this.output = "Credit card number not entered."
    } else if (this.credit_card_type == "") {
      this.output = "Credit card number not valid."
    } else {
      this.output = ""
      this.usersService.register(this.profile_picture, this.user_username, this.user_password, this.user_firstname,
         this.user_lastname, this.gender, this.address, this.contact_number, this.email, this.credit_card_number, this.user_type
      ).subscribe( data => {
        if (data == true) this.router.navigate([""]);
        else this.output = "Username or email already in use."
      })
    }
  }
}
