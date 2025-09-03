import { Component } from '@angular/core';
import { User } from '../models/user';
import { UsersServiceService } from '../services/users-service.service';
import { Router } from '@angular/router';
import { Cottage } from '../models/cottage';
import { CottagesService } from '../services/cottages.service';
import { Reservation } from '../models/reservation';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-tourist',
  templateUrl: './tourist.component.html',
  styleUrls: ['./tourist.component.css']
})
export class TouristComponent {
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

  searchName = "";
  searchLocation = "";
  searchedCottages: Cottage[] = [];

  pendingReservations: Reservation[] = [];
  allCottages: Cottage[] = [];
  cottageNameMapped: { [key: number]: string} = {};
  cottageLocationMapped: { [key: number]: string} = {};

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

    this.cottagesService.getAllCottages().subscribe( data => {
      if (data) this.searchedCottages = data;
    })

    this.cottagesService.getAllCottages().subscribe(cottages => {
      if (cottages) {
        this.searchedCottages = cottages;
        for (let c of cottages) {
          this.cottageNameMapped[c.id] = c.name;
          this.cottageLocationMapped[c.id] = c.location;
        }
      }});
    
    this.reservationsService.getPendingReservationsFromTourist(this.user.id).subscribe( data => {
      if (data) this.pendingReservations = data;
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

  searchCottage() {
    if (this.searchName == "" && this.searchLocation == "") {
      this.cottagesService.getAllCottages().subscribe( data => {
        if (data) this.searchedCottages = data;
      })
    } else if (this.searchLocation == "") {
      this.cottagesService.searchCottageByName(this.searchName).subscribe( data => {
        if (data != null) this.searchedCottages = data;
      });
    } else if (this.searchName == "") {
      this.cottagesService.searchCottageByLocation(this.searchLocation).subscribe( data => {
        if (data != null) this.searchedCottages = data;;
      });
    } else {
      this.cottagesService.searchCottageByNameAndLocation(this.searchName, this.searchLocation).subscribe( data => {
        if (data != null) this.searchedCottages = data;;
      });
    }
  }

  chooseCottage(event: Event, cottage: Cottage) {
    event.preventDefault();
    localStorage.setItem("selected_cottage", JSON.stringify(cottage));
    this.router.navigate(['cottage_detail']);
  }

  getCottageName(id: number) {
    let res = "";
    this.cottagesService.getCottageNameFromID(id).subscribe( data => {
      if (data) res = data.toString();
    });
    return res;
  }

  getCottageLocation(id: number) {
    let res = "";
    this.cottagesService.getCottageLocationFromID(id).subscribe( data => {
      if (data) res = data.toString();
    });
    return res;
  }
}
