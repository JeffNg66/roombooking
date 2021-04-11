import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './service/auth.service';


@Injectable()
export class AuthGuard {
  constructor(private route: Router, private authService: AuthService) {}

  canActivate(
    activatedRouter: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.authenticated) {
      this.route.navigateByUrl('/book/auth');
      return false;
    }
    return true;
  }
}
