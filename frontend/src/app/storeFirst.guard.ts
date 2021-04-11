import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { FlashComponent } from './component/bookMain/flash.component';

@Injectable()
export class StoreFirstGuard {
  private firstStore: boolean = true;
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.firstStore) {
      this.firstStore = false;
      if (route.component != FlashComponent) {
        this.router.navigateByUrl('/');
        return false;
      }
    }
    return true;
  }
}
