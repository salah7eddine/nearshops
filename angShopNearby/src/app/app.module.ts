import { AuthGuard } from './../guards/auth.guard';
import { ReviewService } from './../Services/review.service';
import { AuthService } from './../Services/auth.service';
import { ValidateService } from './../Services/validate.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NearbyShopsComponent } from './components/nearby-shops/nearby-shops.component';
import { PreferredShopsComponent } from './components/preferred-shops/preferred-shops.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ShopService } from 'src/Services/shop.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NearbyShopsComponent,
    PreferredShopsComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // Specify the library as an import
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, ShopService, ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
