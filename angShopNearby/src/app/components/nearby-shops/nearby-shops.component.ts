import { User } from './../../../models/user';
import { ReviewService } from './../../../Services/review.service';
import { AuthService } from './../../../Services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ShopService } from './../../../Services/shop.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nearby-shops',
  templateUrl: './nearby-shops.component.html',
  styleUrls: ['./nearby-shops.component.css']
})
export class NearbyShopsComponent implements OnInit {
  shops: any;
  reviews: any;
  reviewsByDislike: any;
  user: User;
  index = 0;


  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
    this.getNearByShop();
  }

  // GEt from tha database reviews of the user authenticate
  getNearByShop() {
    this.reviewService.getReviewsUser(this.user.idUser).subscribe(data => {
      this.reviews = JSON.parse(JSON.stringify(data)).review.filter(this.filtrerByDislike);
    }, err => {
      this.authService.logout();
      this.router.navigateByUrl('/');
    });
  }

  // filter By Dislike
  filtrerByDislike(review) {
    if (review.dislike === true) {
      return false;
    } else {
      return true;
    }
  }

  // save User
  getUser() {
    this.user = new User(
      localStorage.getItem('userId'),
      localStorage.getItem('email'),
      Number(localStorage.getItem('lat')),
      Number(localStorage.getItem('lon'))
    );
  }


}
