import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  url = "http://localhost:8080/users";

  constructor(private http: HttpClient) { }

  login(user_username_frontend: String, user_password_frontend: String) {
    
    const data = {
      user_username: user_username_frontend,
      user_password: user_password_frontend,
    }

    return this.http.post<User>(`${this.url}/login`, data);
  }

  register(profile_picture: File | null, user_username_f: string, user_password_f: string, user_firstname_f: string, user_lastname_f: string,
    gender_f: string, address_f: string, contact_number_f: string, email_f: string, credit_card_number_f: string, user_type_f: string
  ) {
    const formData = new FormData();
    if (profile_picture) formData.append('profile_picture', profile_picture);
    
    const data = {
      user_username: user_username_f,
      user_password: user_password_f,
      user_firstname: user_firstname_f,
      user_lastname: user_lastname_f,
      gender: gender_f,
      address: address_f,
      contact_number: contact_number_f,
      email: email_f,
      credit_card_number: credit_card_number_f,
      user_type: user_type_f
    }

    formData.append('user_data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    return this.http.post<boolean>(`${this.url}/register`, formData);
  }

  updateUsername(user_username: string, newUsername: string) {
    const formData = new FormData();
    formData.append("user_username", user_username);
    formData.append("new_username", newUsername);

    return this.http.post<boolean>(`${this.url}/update-username`, formData);
  }

  updateFirstname(user_username: string, newFirstname: string) {
    const formData = new FormData();
    formData.append("user_username", user_username);
    formData.append("new_firstname", newFirstname);

    return this.http.post<boolean>(`${this.url}/update-firstname`, formData);
  }

  updateLastname(user_username: string, newLastname: string) {
    const formData = new FormData();
    formData.append("user_username", user_username);
    formData.append("new_lastname", newLastname);

    return this.http.post<boolean>(`${this.url}/update-lastname`, formData);
  }

  updateAddress(user_username: string, newAddress: string) {
    const formData = new FormData();
    formData.append("user_username", user_username);
    formData.append("new_address", newAddress);

    return this.http.post<boolean>(`${this.url}/update-address`, formData);
  }

  updateContactNumber(user_username: string, newContactNumber: string) {
    const formData = new FormData();
    formData.append("user_username", user_username);
    formData.append("new_contact_number", newContactNumber);

    return this.http.post<boolean>(`${this.url}/update-contact-number`, formData);
  }

  updateEmail(user_username: string, newEmail: string) {
    const formData = new FormData();
    formData.append("user_username", user_username);
    formData.append("new_email", newEmail);

    return this.http.post<boolean>(`${this.url}/update-email`, formData);
  }

  updateCreditCardNumber(user_username: string, newCreditCardNumber: string) {
    const formData = new FormData();
    formData.append("user_username", user_username);
    formData.append("new_credit_card_number", newCreditCardNumber);

    return this.http.post<boolean>(`${this.url}/update-credit-card-number`, formData);
  }

  updateProfilePicture(user_username: string, old_profile_picture: string, new_profile_picture: File) {
    const formData = new FormData();
    formData.append("user_username", user_username);
    formData.append("old_profile_picture", old_profile_picture);
    formData.append("new_profile_picture", new_profile_picture);

    return this.http.post<string>(`${this.url}/update-profile-picture`, formData, {responseType: 'text' as 'json'});
  }

  getAwaitingUsers() {
    return this.http.get<User[]>(`${this.url}/get-awaiting-users`);
  }

  acceptAwaitingUser(user_username: string) {
    return this.http.get<boolean>(`${this.url}/accept-awaiting-user/${user_username}`);
  }

  rejectAwaitingUser(user_username: string) {
    return this.http.get<boolean>(`${this.url}/reject-awaiting-user/${user_username}`);
  }

  getAcceptedOwners() {
    return this.http.get<User[]>(`${this.url}/get-accepted-owners`);
  }

  getAcceptedTourists() {
    return this.http.get<User[]>(`${this.url}/get-accepted-tourists`);
  }

  updatePassword(user_username: string, old_user_password: string, new_user_password: string) {
    const formData = new FormData();
    formData.append("user_username", user_username);
    formData.append("old_user_password", old_user_password);
    formData.append("new_user_password", new_user_password);
    return this.http.get<boolean>(`${this.url}/update-user-password/${user_username}/${old_user_password}/${new_user_password}`);
  }

  getAcceptedOwnersCount() {
    return this.http.get<number>(`${this.url}/get-accepted-owners-count`);
  }

  getAcceptedTouristsCount() {
    return this.http.get<number>(`${this.url}/get-accepted-tourists-count`);
  }

  deactivateUser(user: User) {
    return this.http.post<boolean>(`${this.url}/deactivate-user`, user.user_username);
  }

  editUser(user: User) {
    return this.http.post<boolean>(`${this.url}/edit-user`, user);
  }
}
