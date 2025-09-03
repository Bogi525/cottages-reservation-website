import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  url = "http://localhost:8080/reservations";

  constructor(private http: HttpClient) {}

  addPendingReservation(reservation: Reservation) {
    const data = {...reservation}
    
    return this.http.post<boolean>(`${this.url}/add-pending`, data);
  }

  getPendingReservationsForOwner(owner_username: string) {
    return this.http.get<Reservation[]>(`${this.url}/get-pending-reservations-for-owner/${owner_username}`)
  }

  getPendingReservationsFromTourist(tourist_id: number) {
    return this.http.get<Reservation[]>(`${this.url}/get-pending-reservations-from-tourist/${tourist_id}`)
  }

  acceptPendingReservation(id: number, comment: string) {
    const data = {
      id: id,
      comment: comment
    }

    return this.http.post<boolean>(`${this.url}/accept-pending-reservation`, data);
  }

  rejectPendingReservation(id: number, comment: string) {
    const data = {
      id: id,
      comment: comment
    }

    return this.http.post<boolean>(`${this.url}/reject-pending-reservation`, data);
  }

  getReservationCountLastDay() {
    return this.http.get<number>(`${this.url}/get-reservation-count/1d`)
  }

  getReservationCountLast7Days() {
    return this.http.get<number>(`${this.url}/get-reservation-count/7d`)
  }

  getReservationCountLast30Days() {
    return this.http.get<number>(`${this.url}/get-reservation-count/30d`)
  }
}
