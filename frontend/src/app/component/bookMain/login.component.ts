import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/model/userDTO.model';
import Notify from '../../../assets/js/notify.js';
/**
 * LoginComponent
 */
@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['../../app.component.css']
})
export class LoginComponent {
  // object to store the login user data
  user: UserDTO = new UserDTO();
  private notify = new Notify();
  submitted: boolean = false;

  /**
   * Constructor
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * authenticate
   */
  authenticate(form: NgForm): void {
    this.submitted = true;
    this.authService.clear();
    this.authService
      .authenticate(this.user.name, this.user.password)
      .subscribe(response => {
        if (response) {
          // When the login succeed, move to the booking page
          this.router.navigateByUrl('/book/main');
        } else {
          // When the login fails, alert that authentication failed
          // this.alert.warning('Please enter the password!');
        }
      });
  }
}
