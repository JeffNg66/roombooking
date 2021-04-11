import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/model/userDTO.model';
import { UserRepository } from 'src/app/repository/user.repository';
import Notify from '../../../assets/js/notify.js';
import { __values } from 'tslib';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['../../app.component.css']
})
export class RegisterComponent {
  private notify = new Notify();
  // user info container
  user: UserDTO = new UserDTO();
  // password confirm
  confirmPassword: string = null;
  // form submitted?
  submitted: boolean = false;
  // data sent?
  sent: boolean = false;

  /**
   * Constructor
   */
  constructor(private router: Router, private userRepository: UserRepository) {}

  /**
   * Submit form
   */
  submitForm(form: NgForm): void {
    this.submitted = true;
    if (form.valid && this.user != null) {
      if (this.user.password == this.confirmPassword) {
        this.user.role_id = 2;
        this.userRepository.addUser(this.user);
        this.router.navigateByUrl('/');
        this.sent = true;
      } else {
        this.notify.notification('error', 'Please retype password!');
      }
    }
  }
  /**
   * Cancel register
   */
  cancel(): void {
    this.router.navigateByUrl('/');
  }
}
