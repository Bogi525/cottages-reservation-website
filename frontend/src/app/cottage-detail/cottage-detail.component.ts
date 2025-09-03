import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CottagesService } from '../services/cottages.service';
import { Cottage } from '../models/cottage';
import { CottageImage } from '../models/cottageImage';

@Component({
  selector: 'app-cottage-detail',
  templateUrl: './cottage-detail.component.html',
  styleUrls: ['./cottage-detail.component.css']
})
export class CottageDetailComponent {
  cottage: Cottage = new Cottage();
  notSelected: boolean = false;

  pictureList: CottageImage[] = [];

  constructor(private cottagesService: CottagesService, private router: Router) {}

  ngOnInit() {
    let current_cottage = localStorage.getItem("selected_cottage");
    if (current_cottage) this.cottage = JSON.parse(current_cottage);
    else {
      this.notSelected = true;
      return;
    }
    this.cottagesService.getPictureList(this.cottage.id).subscribe( data => {
      if (data) this.pictureList = data;
    });
  }

  back() {
    localStorage.removeItem("selected_cottage");
    this.router.navigate(['tourist']);
  }

  goToReservationForm() {
    this.router.navigate(['reservation_form1']);
  }
}
