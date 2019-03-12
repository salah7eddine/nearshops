import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../../Services/auth.service';
import { Review } from './../../../models/review';
import { User } from './../../../models/user';
import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from 'src/Services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @Input() review: any;
  @Input() index: number;
  @Input() disLike: boolean;
  user: any;
  shop: any;
  hidden: any;
  posUser: any;
  posShop: any;
  shopDislike: any;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getUser();
    Array.from(this.review.shop).sort((a, b) => {
      return this.distanceUserShop(a) - this.distanceUserShop(b);
    });
    this.shop = this.review.shop;
    this.verifyShopDislike();
    this.shopDislike = Array.from(this.shop).map(this.filterByDislike);
    this.hideButton();

  }

  // Get reviews of the dislike false or time more than 2h he must update of the dislike true to false
  verifyShopDislike() {
    this.reviewService.getReviews().subscribe(data => {
      JSON.parse(JSON.stringify(data)).reviews.forEach(rev => {
        if (rev.dislike) {
          const dateRev: Date = new Date(rev.timeDislike);
          const hours   = Math.round((( (Date.now() - dateRev.getTime()) / (1000 * 60 * 60)) % 24));
          if (hours > 2) {
            this.reviewService.updateReviewUser(rev._id, 'dislike', false ).subscribe(result => {
            }, err => {
              this.authService.logout();
              this.router.navigateByUrl('/');
            });
          }
        }
      });
    });
  }

  // Get the position of the user and the shop
  distanceUserShop(shop): any {
    this.posUser = [this.user.lat, this.user.lon];
    this.posShop = [shop.lat, shop.lon];
    this.distance(this.posUser, this.posShop);
  }

  // Calsul the distance
  distance(positionUser: any, positionShop: any): number  {
    return Math.sqrt(Math.pow(positionShop[0] - positionUser[0], 2) + Math.pow(positionShop[1] - positionUser[1], 2));
  }

  // hide buttons in order show them in the page that we want
  hideButton() {
    if (this.index === 0) {
      this.hidden = true;
    }
  }


  // filter By Dislike
  filterByDislike(review) {
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

    // update reviews in the attribute dislike to be true
  onDislike() {
    this.reviewService.updateReviewUser(this.review._id, 'dislike', true ).subscribe(data => {
      this.router.navigateByUrl('/');
      this.flashMessage.show('you Dislike ' + this.review.shop.title, {cssClass: 'alert-success', timeout: 5000});
    }, err => {
      this.authService.logout();
      this.router.navigateByUrl('/');
    });
  }

  // update reviews in the attribute like to be true
  onLike() {
    this.reviewService.updateReviewUser(this.review._id, 'like', true ).subscribe(data => {
      this.router.navigateByUrl('/preferredShop');
      this.flashMessage.show('you like ' + this.review.shop.title, {cssClass: 'alert-success', timeout: 5000});
    }, err => {
      this.authService.logout();
      this.router.navigateByUrl('/');
    });
  }

  // update reviews in the attribute like to be false
  onRemove() {
    this.reviewService.updateReviewUser(this.review._id, 'like' , false ).subscribe(data => {
      this.router.navigateByUrl('/nearbyShop');
      this.flashMessage.show('you Remove ' + this.review.shop.title, {cssClass: 'alert-success', timeout: 5000});

    }, err => {
      this.authService.logout();
      this.router.navigateByUrl('/');
    });
  }

}
