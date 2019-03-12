import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  jwt: any;

  constructor(private http: HttpClient) { }

  getShops() {
    if (this.jwt == null) { this.loadToken(); }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': `Bearer ${this.jwt}`
      })
    };
    return this.http.get('shops', httpOptions);
  }


  loadToken() {
    this.jwt = localStorage.getItem('token');
  }
}
