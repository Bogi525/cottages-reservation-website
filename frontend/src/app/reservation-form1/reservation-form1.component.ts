import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Cottage } from '../models/cottage';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-reservation-form1',
  templateUrl: './reservation-form1.component.html',
  styleUrls: ['./reservation-form1.component.css']
})
export class ReservationForm1Component {

  constructor(private reservationsService: ReservationsService, private router: Router) {}

  reservation: Reservation = new Reservation();
  cottage: Cottage = new Cottage();
  user: User = new User();

  creditCardNumber = "";
  step = 1;

  feedback = "";
  
  ngOnInit() {
    let temp1 = localStorage.getItem("selected_cottage");
    if (temp1) this.cottage = JSON.parse(temp1);
    let temp2 = localStorage.getItem("logged_in");
    if (temp2) this.user = JSON.parse(temp2);

    const tenAM = new Date();
    tenAM.setHours(12, 0, 0, 0);
    this.reservation.end_date = tenAM.toISOString().slice(0, 16);

    const twoPM = new Date();
    twoPM.setHours(16, 0, 0, 0);
    this.reservation.start_date = twoPM.toISOString().slice(0, 16);

    this.creditCardNumber = this.user.credit_card_number;
    this.determineCreditCardType(this.creditCardNumber);
  }

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

  updateStartDateTime() {
    const date = new Date(this.reservation.start_date);
    date.setHours(16, 0, 0, 0);

    const fixed = date.toISOString().slice(0, 16);
    this.reservation.start_date = fixed;
  }

  updateEndDateTime() {
    const date = new Date(this.reservation.end_date);
    date.setHours(12, 0, 0, 0);

    const fixed = date.toISOString().slice(0, 16);
    this.reservation.end_date = fixed;
  }

  proceed(s: number) {
    this.step = s;
    this.calculateTotalPrice();
  }

  getSeason(month: number) {
    if ([3, 4].includes(month)) return "spring";
    if ([5, 6, 7, 8].includes(month)) return "summer";
    if ([9, 10, 11].includes(month)) return "autumn";
    return "winter";
  }

  calculateTotalPrice() {
    const startDate = new Date(this.reservation.start_date);
    const endDate = new Date(this.reservation.end_date);

    const current = new Date(this.reservation.start_date);

    while (current < endDate) {
      const season = this.getSeason(current.getMonth() + 1);
      switch (season) {
        case 'spring':
          this.reservation.total_price += this.cottage.spring_price * this.reservation.adults + this.cottage.spring_price * this.reservation.children;
          break;
        case 'summer':
          this.reservation.total_price += this.cottage.summer_price * this.reservation.adults + this.cottage.summer_price * this.reservation.children;
          break;
        case 'autumn':
          this.reservation.total_price += this.cottage.autumn_price * this.reservation.adults + this.cottage.autumn_price * this.reservation.children;
          break;
        case 'winter':
          this.reservation.total_price += this.cottage.winter_price * this.reservation.adults + this.cottage.winter_price * this.reservation.children;
          break;
      }

      current.setDate(current.getDate() + 1);
    }
  }

  additionalInfoChanged() {
    if (this.reservation.additional_info.length > 500) {
      this.reservation.additional_info = this.reservation.additional_info.slice(0, 500);
    }
  }

  confirmReservation() {
    if (this.credit_card_type == "") {
      this.feedback = "Unknown credit card type";
    } else if (this.reservation.additional_info.length > 500) {
      this.feedback = "Additional information exceeds 500 character length"
    } else {
      this.reservation.user_id = this.user.id;
      this.reservation.cottage_id = this.cottage.id;
      
      this.reservationsService.addPendingReservation(this.reservation).subscribe( data => {
        if (data) this.router.navigate(['cottage_detail'])
      });
    }
  }
}
