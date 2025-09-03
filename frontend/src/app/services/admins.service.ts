import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  url = "http://localhost:8080/admins"

  constructor(private http: HttpClient) { }

  login(admin_username_f: string, admin_password_f: string) {
    const data = {
      admin_username: admin_username_f,
      admin_password: admin_password_f
    }

    return this.http.post<Admin>(`${this.url}/login`, data);
  }

  register(admin_username_f: string, admin_password_f: string) {
    const data = {
      admin_username: admin_username_f,
      admin_password: admin_password_f
    }

    return this.http.post<Admin>(`${this.url}/register`, data);
  }
}
