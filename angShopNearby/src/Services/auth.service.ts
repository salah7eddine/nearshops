import { JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwt: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/signup', user, {headers});
  }

  authenticateUser(user: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/login', user, {headers});
  }


  storeUserData(token: any) {
    localStorage.setItem('token', token);
    const jwthelper = new JwtHelper();
    this.user = jwthelper.decodeToken(token);
    localStorage.setItem('email', this.user.email);
    localStorage.setItem('lat', this.user.lat);
    localStorage.setItem('lon', this.user.lon);
    localStorage.setItem('userId', this.user.userId);
  }

  isLoggedIn() {
    return (localStorage.getItem('token') != null);
  }

  logout() {
    this.jwt = null;
    this.user = null;
    localStorage.clear();
  }

}
