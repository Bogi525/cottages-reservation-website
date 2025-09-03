import { Component } from '@angular/core';
import { Cottage } from '../models/cottage';
import { Router } from '@angular/router';
import { CottagesService } from '../services/cottages.service';
import { CottageImage } from '../models/cottageImage';

@Component({
  selector: 'app-edit-cottage',
  templateUrl: './edit-cottage.component.html',
  styleUrls: ['./edit-cottage.component.css']
})
export class EditCottageComponent {

  constructor(private cottagesService: CottagesService ,private router: Router) {};
  notSelected: boolean = false;

  id: number = 0;
  name: string = "";
  location: string = "";
  services: string = "";
  spring_price: number = 0;
  summer_price: number = 0;
  autumn_price: number = 0;
  winter_price: number = 0;
  phone: string = "";

  newPicture: File | null = null;
  pictureError = "";

  pictureList: CottageImage[] = [];

  ngOnInit() {
    let temp = localStorage.getItem("selected_cottage");
    if (temp != null) {
      let selected_cottage: Cottage = JSON.parse(temp);
      this.id = selected_cottage.id;
      this.name = selected_cottage.name;
      this.location = selected_cottage.location;
      this.services = selected_cottage.services;
      this.spring_price = selected_cottage.spring_price;
      this.summer_price = selected_cottage.summer_price;
      this.autumn_price = selected_cottage.autumn_price;
      this.winter_price = selected_cottage.winter_price;
      this.phone = selected_cottage.phone;

      this.cottagesService.getPictureList(this.id).subscribe( data => {
        if (data) this.pictureList = data;
      });
    }
    else {
      this.notSelected = true;
      return;
    }
  }

  editCottage() {
    if (this.spring_price == 0) this.spring_price = this.winter_price;
    if (this.autumn_price == 0) this.autumn_price = this.winter_price;
    this.cottagesService.editCottage(
      this.id, this.name, this.location, this.services, this.spring_price,
      this.summer_price, this.autumn_price, this.winter_price, this.phone
    ).subscribe( data => {
      if (data == true) {
        localStorage.removeItem("selected_cottage");
        this.router.navigate(["owner"])
      }
    });
  }

  back() {
    localStorage.removeItem("selected_cottage");
    this.router.navigate(["owner"])
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.newPicture = target.files[0];

      const img = new Image();
      img.src = URL.createObjectURL(this.newPicture);
    }
  }

  addPicture() {
    if (this.newPicture == null) {
      this.pictureError = "New picture not chosen.";
      return;
    }
    this.pictureError = "";
    this.cottagesService.addCottagePicture(this.newPicture, this.id).subscribe( data => {
      if (data) this.ngOnInit();
    });
  }
}
