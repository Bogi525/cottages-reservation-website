import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from '../services/users-service.service';
import { CottagesService } from '../services/cottages.service';
import { Cottage } from '../models/cottage';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  cottageCount = 0;
  ownerCount = 0;
  touristCount = 0;

  reservationCount1D = 0;
  reservationCount7D = 0;
  reservationCount30D = 0;

  searchName = "";
  searchLocation = "";
  searchFeedback = "";
  searchedCottages: Cottage[] = []

  constructor(private usersService: UsersServiceService, private cottagesService: CottagesService, private reservationsService: ReservationsService, private router: Router) {}

  ngOnInit() {
    this.getAcceptedOwnersCount();
    this.getAcceptedTouristsCount();
    this.getCottageCount();
    this.getReservationCount1D();
    this.getReservationCount7D();
    this.getReservationCount30D();
  }

  getAcceptedOwnersCount() {
    this.usersService.getAcceptedOwnersCount().subscribe( data => {
      if (data > 0) {
        this.ownerCount = data;
      }
    })
  }

  getAcceptedTouristsCount() {
    this.usersService.getAcceptedTouristsCount().subscribe( data => {
      if (data > 0) {
        this.touristCount = data;
      }
    })
  }

  getCottageCount() {
    this.cottagesService.getCottageCount().subscribe( data => {
      if (data > 0) this.cottageCount = data;
    })
  }

  getReservationCount1D() {
    this.reservationsService.getReservationCountLastDay().subscribe( data => {
      if (data) this.reservationCount1D = data;
    })
  }

  getReservationCount7D() {
    this.reservationsService.getReservationCountLast7Days().subscribe( data => {
      if (data) this.reservationCount7D = data;
    })
  }

  getReservationCount30D() {
    this.reservationsService.getReservationCountLast30Days().subscribe( data => {
      if (data) this.reservationCount30D = data;
    })
  }

  searchCottage() {
    if (this.searchName == "" && this.searchLocation == "") {
      this.searchFeedback = "You need to enter either a name or a location.";
    } else if (this.searchLocation == "") {
      this.searchFeedback = "";
      this.cottagesService.searchCottageByName(this.searchName).subscribe( data => {
        if (data != null) this.searchedCottages = data;
      });
    } else if (this.searchName == "") {
      this.searchFeedback = "";
      this.cottagesService.searchCottageByLocation(this.searchLocation).subscribe( data => {
        if (data != null) this.searchedCottages = data;;
      });
    } else {
      this.searchFeedback = "";
      this.cottagesService.searchCottageByNameAndLocation(this.searchName, this.searchLocation).subscribe( data => {
        if (data != null) this.searchedCottages = data;;
      });
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }
}
