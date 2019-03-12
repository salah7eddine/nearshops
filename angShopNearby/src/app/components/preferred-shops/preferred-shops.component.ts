import { Router } from '@angular/router';
import { AuthService } from './../../../Services/auth.service';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/Services/review.service';

@Component({
  selector: 'app-preferred-shops',
  templateUrl: './preferred-shops.component.html',
  styleUrls: ['./preferred-shops.component.css']
})
export class PreferredShopsComponent implements OnInit {
  shops: any;
  reviews: any;
  results: any;
  user: User;
  index = 1;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router
  ) {   }

  ngOnInit() {
    this.getUser();
    this.getNearByShop();
  }

    // GEt from tha database reviews of the user authenticate
  getNearByShop() {
    this.reviewService.getReviewsUser(this.user.idUser).subscribe(data => {
      this.results = JSON.parse(JSON.stringify(data)).review;
      this.reviews = this.results.filter(this.filtrerByLike).filter(this.filtrerByDislike);
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

  // filter By like
  filtrerByLike(review) {
    if (review.like === true) {
      return true;
    } else {
      return false;
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
