import { AuthGuard } from './../guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NearbyShopsComponent } from './components/nearby-shops/nearby-shops.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreferredShopsComponent } from './components/preferred-shops/preferred-shops.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'nearbyShop', component: NearbyShopsComponent, canActivate: [AuthGuard]},
  {path: 'preferredShop', component: PreferredShopsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
