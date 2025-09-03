import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cottage } from '../models/cottage';
import { CottageImage } from '../models/cottageImage';

@Injectable({
  providedIn: 'root'
})
export class CottagesService {
  url: string = "http://localhost:8080/cottages"

  constructor(private http: HttpClient) { }

  getCottageCount() {
    return this.http.get<number>(`${this.url}/get-cottage-count`);
  }

  searchCottageByName(name: string) {
    return this.http.get<Cottage[]>(`${this.url}/search-by-name/${name}`);
  }

  searchCottageByLocation(location: string) {
    return this.http.get<Cottage[]>(`${this.url}/search-by-location/${location}`);
  }

  searchCottageByNameAndLocation(name: string, location: string) {
    return this.http.get<Cottage[]>(`${this.url}/search-by-name-and-location/${name}/${location}`);
  }

  getOwnersCottages(owner_username: string) {
    return this.http.get<Cottage[]>(`${this.url}/get-owners-cottages/${owner_username}`);
  }

  editCottage(
    id: number, name: string, location: string, services: string, spring_price: number,
    summer_price: number, autumn_price: number, winter_price: number, phone: string
  ) {
    const data = {
      id: id,
      name: name,
      location: location,
      services: services,
      spring_price: spring_price,
      summer_price: summer_price,
      autumn_price: autumn_price,
      winter_price: winter_price,
      phone: phone
    }

    return this.http.post<boolean>(`${this.url}/edit-cottage`, data);
  }

  deleteCottage(id: number) {
    const data = {
      id: id
    }
    return this.http.post<boolean>(`${this.url}/delete-cottage`, id);
  }

  addCottage(cottage: Cottage, owner_username: string) {
    const data = {
      name: cottage.name,
      location: cottage.location,
      services: cottage.services,
      spring_price: cottage.spring_price,
      summer_price: cottage.summer_price,
      autumn_price: cottage.autumn_price,
      winter_price: cottage.winter_price,
      phone: cottage.phone,
      owner_username: owner_username
    }

    return this.http.post<boolean>(`${this.url}/add-cottage`, data);
  }

  deleteOwnersCottages(owner_username: string) {
    return this.http.post<boolean>(`${this.url}/delete-owners-cottages`, owner_username);
  }

  getAllCottages() {
    return this.http.get<Cottage[]>(`${this.url}/all-cottages`);
  }

  getCottageByID(id: number) {
    return this.http.get<Cottage>(`${this.url}/get-cottage-by-id`);
  }

  addCottagePicture(file: File, cottage_id: number) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("cottage_id", cottage_id.toString());

    return this.http.post<boolean>(`${this.url}/add-picture`, formData);
  }

  getPictureList(cottage_id: number) {
    return this.http.get<CottageImage[]>(`${this.url}/get-picture-list/${cottage_id}`);
  }

  getCottageNameFromID(cottage_id: number) {
    return this.http.get<String>(`${this.url}/get-cottage-name-from-id/${cottage_id}`)
  }

  getCottageLocationFromID(cottage_id: number) {
    return this.http.get<String>(`${this.url}/get-cottage-location-from-id/${cottage_id}`)
  }
}
