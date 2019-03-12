import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  jwt: any;

  constructor(private http: HttpClient) { }

  getReviews() {
    if (this.jwt == null) { this.loadToken(); }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': `Bearer ${this.jwt}`
      })
    };
    return this.http.get('http://localhost:3000/reviews', httpOptions);
  }

  getReviewsUser(id: string) {
    if (this.jwt == null) { this.loadToken(); }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': `Bearer ${this.jwt}`
      })
    };
    return this.http.get('http://localhost:3000/reviews/userReviews/' + id, httpOptions);
  }

  updateReviewUser(id: string, att: string, like: boolean) {
    if (this.jwt == null) { this.loadToken(); }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': `Bearer ${this.jwt}`
      })
    };

    const updateReview = [{propName: att, value: like}];

    return this.http.patch('http://localhost:3000/reviews/' + id, updateReview, httpOptions);
  }


  loadToken() {
    this.jwt = localStorage.getItem('token');
  }
}
