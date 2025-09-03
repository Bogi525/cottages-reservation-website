import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TouristComponent } from './tourist/tourist.component';
import { OwnerComponent } from './owner/owner.component';
import { RegisterComponent } from './register/register.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminComponent } from './admin/admin.component';
import { EditCottageComponent } from './edit-cottage/edit-cottage.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CottageDetailComponent } from './cottage-detail/cottage-detail.component';
import { ReservationForm1Component } from './reservation-form1/reservation-form1.component';

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin_login", component: AdminLoginComponent },
  { path: "admin", component: AdminComponent},
  { path: "admin_register", component: AdminRegisterComponent},
  { path: "tourist", component: TouristComponent },
  { path: "owner", component: OwnerComponent },
  { path: "edit_cottage", component: EditCottageComponent },
  { path: "edit_user", component: EditUserComponent },
  { path: "cottage_detail", component: CottageDetailComponent },
  { path: "reservation_form1", component: ReservationForm1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
