import { AuthService } from './../../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    // Authentification
    this.authService.authenticateUser(user).subscribe(data => {
      if (JSON.parse(JSON.stringify(data))) {
        this.authService.storeUserData(JSON.parse(JSON.stringify(data)).token);
        this.flashMessage.show('you are now logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['']);
      } else {
        this.flashMessage.show('user not found', {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    }, err => {
      this.authService.logout();
      this.router.navigateByUrl('/');
    });
  }

}
