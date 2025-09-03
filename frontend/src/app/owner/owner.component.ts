import { Component } from '@angular/core';
import { User } from '../models/user';
import { UsersServiceService } from '../services/users-service.service';
import { Router } from '@angular/router';
import { Cottage } from '../models/cottage';
import { CottagesService } from '../services/cottages.service';
import { Reservation } from '../models/reservation';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent {
  constructor(private usersService: UsersServiceService, private cottagesService: CottagesService, private reservationsService: ReservationsService, private router: Router) {}

  user: User = new User()

  isEditingFirstname = false;
  newFirstname = "";

  isEditingLastname = false;
  newLastname = "";

  isEditingAddress = false;
  newAddress = "";

  isEditingContactNumber = false;
  newContactNumber = "";

  isEditingEmail = false;
  newEmail = "";

  isEditingCreditCardNumber = false;
  newCreditCardNumber = "";

  isEditingPicture = false;
  newPicture: File | null = null;
  pictureError: String = "";
  profile_picture_with_timestamp: string = "";

  oldPassword = "";
  newPassword = "";
  newPassword2 = "";
  newPasswordFeedback = "";

  credit_card_type = "";
  credit_card_feedback = "";

  myCottages: Cottage[] = [];

  newCottage: Cottage = new Cottage();
  newCottageFeedback = "";

  pendingReservations: Reservation[] = [];

  feedback = "";

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

  ngOnInit() {
    let logged_in_user = localStorage.getItem("logged_in");
    if (logged_in_user != null) {
      this.user = JSON.parse(logged_in_user);
      this.profile_picture_with_timestamp = this.user.profile_picture + '?t=' + Date.now();
    }
    this.getMyCottages();
    this.reservationsService.getPendingReservationsForOwner(this.user.user_username).subscribe( data => {
      if (data) {
        this.pendingReservations = data;
        this.pendingReservations = this.pendingReservations.sort((a, b) => {
          return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
        })
      }
    });
  }

  editFirstname() {
    this.isEditingFirstname = !this.isEditingFirstname;
  }
  updateFirstname() {
    this.usersService.updateFirstname(this.user.user_username, this.newFirstname).subscribe(data => {
      if (data) {
        this.user.user_firstname = this.newFirstname;
        localStorage.setItem("logged_in", JSON.stringify(this.user));
        this.isEditingFirstname = false;
      }
    });
  }

  editLastname() {
    this.isEditingLastname = !this.isEditingLastname;
  }
  updateLastname() {
    this.usersService.updateLastname(this.user.user_username, this.newLastname).subscribe(data => {
      if (data) {
        this.user.user_lastname = this.newLastname;
        localStorage.setItem("logged_in", JSON.stringify(this.user));
        this.isEditingLastname = false;
      }
    });
  }

  editAddress() {
    this.isEditingAddress = !this.isEditingAddress;
  }
  updateAddress() {
    this.usersService.updateAddress(this.user.user_username, this.newAddress).subscribe(data => {
      if (data) {
        this.user.address = this.newAddress;
        localStorage.setItem("logged_in", JSON.stringify(this.user));
        this.isEditingAddress = false;
      }
    });
  }

  editContactNumber() {
    this.isEditingContactNumber = !this.isEditingContactNumber;
  }
  updateContactNumber() {
    this.usersService.updateContactNumber(this.user.user_username, this.newContactNumber).subscribe(data => {
      if (data) {
        this.user.contact_number = this.newContactNumber;
        localStorage.setItem("logged_in", JSON.stringify(this.user));
        this.isEditingContactNumber = false;
      }
    });
  }

  editEmail() {
    this.isEditingEmail = !this.isEditingEmail;
  }
  updateEmail() {
    this.usersService.updateEmail(this.user.user_username, this.newEmail).subscribe(data => {
      if (data) {
        this.user.email = this.newEmail;
        localStorage.setItem("logged_in", JSON.stringify(this.user));
        this.isEditingEmail = false;
      }
    });
  }

  editCreditCardNumber() {
    this.isEditingCreditCardNumber = !this.isEditingCreditCardNumber;
  }
  updateCreditCardNumber() {
    if (this.credit_card_type == "") {
      this.credit_card_feedback = "Credit card number not valid.";
      return;
    }
    this.usersService.updateCreditCardNumber(this.user.user_username, this.newCreditCardNumber).subscribe(data => {
      if (data) {
        this.user.credit_card_number = this.newCreditCardNumber;
        this.newCreditCardNumber = "";
        this.credit_card_type = "";
        this.credit_card_feedback = "";
        localStorage.setItem("logged_in", JSON.stringify(this.user));
        this.isEditingCreditCardNumber = false;
      }
    });
  } 

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.newPicture = target.files[0];

      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width < 100 || height < 100 || width > 300 || height > 300) {
          alert("Image must be between 100x100 and 300x300 pixels.");
          this.newPicture = null;
          target.value = "";
        }
      };
      img.src = URL.createObjectURL(this.newPicture);
    }
  }

  editPicture() {
    this.isEditingPicture = !this.isEditingPicture;
  }
  updatePicture() {
    if (this.newPicture == null) {
      this.pictureError = "New picture not chosen.";
      return;
    }
    this.pictureError = "";
    this.usersService.updateProfilePicture(this.user.user_username, this.user.profile_picture, this.newPicture).subscribe(data => {
      if (data != "") {
        this.user.profile_picture = data;
        this.profile_picture_with_timestamp = data + '?t=' + Date.now();
        localStorage.setItem("logged_in", JSON.stringify(this.user));
        this.ngOnInit();
      } else {
        this.pictureError = "Bad request.";
      }
    });
  }

  updatePassword() {
    if (this.oldPassword == this.newPassword) {
      this.newPasswordFeedback = "New password cannot be the same as the old password";
      return;
    }
    if (this.newPassword != this.newPassword2) {
      this.newPasswordFeedback = "New password inputs do not match."
      return;
    }
    const passwordRegex = /^(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z].{4,8}$/;

    if (!passwordRegex.test(this.newPassword)) {
      this.newPasswordFeedback = "Invalid password format"
    } else {
      this.newPasswordFeedback = ""
      this.usersService.updatePassword(this.user.user_username, this.oldPassword, this.newPassword).subscribe(data => {
        if (data) {
          localStorage.removeItem("logged_in");
          this.router.navigate([""]);
        } else {
          this.newPasswordFeedback = "Old password incorrect";
        }
      })
    }
  }

  getMyCottages() {
    this.cottagesService.getOwnersCottages(this.user.user_username).subscribe( data => {
      if (data != null) {
        this.myCottages = data;
      }
    });
  }

  editCottage(cottage: Cottage) {
    localStorage.setItem("selected_cottage", JSON.stringify(cottage));
    this.router.navigate(["edit_cottage"])
  }

  deleteCottage(cottage: Cottage) {
    this.cottagesService.deleteCottage(cottage.id).subscribe( data => {
      if (data) this.ngOnInit();
    });
  }

  addCottage() {
    if (this.newCottage.name == "") {
      this.newCottageFeedback = "Name not entered.";
    } else if (this.newCottage.location == "") {
      this.newCottageFeedback = "Location not entered.";
    } else if (this.newCottage.services == "") {
      this.newCottageFeedback = "Services not entered.";
    } else if (this.newCottage.summer_price == 0) {
      this.newCottageFeedback = "Summer price not entered.";
    } else if (this.newCottage.winter_price == 0) {
      this.newCottageFeedback = "Winter price not entered.";
    } else if (this.newCottage.phone == "") {
      this.newCottageFeedback = "Phone number not entered.";
    }
    else if (this.newCottage.services.length > 500) {
      this.newCottageFeedback = "Services must have less that 500 characters.";
      return;
    } else {
      if (this.newCottage.spring_price == 0) this.newCottage.spring_price = this.newCottage.winter_price;
      if (this.newCottage.autumn_price == 0) this.newCottage.autumn_price = this.newCottage.winter_price;
      this.cottagesService.addCottage(this.newCottage, this.user.user_username).subscribe( data => {
        this.newCottage = new Cottage();
        if (data) this.ngOnInit();
      });
    }
  }

  getCottageName(id: number) {
    for (let cottage of this.myCottages) {
      if (cottage.id == id) return cottage.name;
    }
    return "";
  }

  getCottageLocation(id: number) {
    for (let cottage of this.myCottages) {
      if (cottage.id == id) return cottage.location;
    }
    return "";
  }

  acceptReservation(id: number, comment: string) {
    this.reservationsService.acceptPendingReservation(id, comment).subscribe( data => {
      if (data) this.ngOnInit();
    });
  }

  rejectReservation(id: number, comment: string) {
    this.feedback = comment;
    if (comment.trim() == "") return
    this.reservationsService.rejectPendingReservation(id, comment).subscribe( data => {
      if (data) this.ngOnInit();
    });
  }
}
