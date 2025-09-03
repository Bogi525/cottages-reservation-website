import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegisterComponent } from './register/register.component';
import { TouristComponent } from './tourist/tourist.component';
import { OwnerComponent } from './owner/owner.component';
import { AdminComponent } from './admin/admin.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { EditCottageComponent } from './edit-cottage/edit-cottage.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CottageDetailComponent } from './cottage-detail/cottage-detail.component';
import { ReservationForm1Component } from './reservation-form1/reservation-form1.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    AdminLoginComponent,
    RegisterComponent,
    TouristComponent,
    OwnerComponent,
    AdminComponent,
    LogoutComponent,
    AdminRegisterComponent,
    EditCottageComponent,
    EditUserComponent,
    CottageDetailComponent,
    ReservationForm1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
