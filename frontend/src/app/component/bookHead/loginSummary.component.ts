import { Component } from "@angular/core";
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'login-summary',
    templateUrl: 'loginSummary.component.html',
    styleUrls: ['loginSummary.component.css']
})
export class LoginSummaryComponent {
    constructor(public authService: AuthService, public user: User, private router: Router) {}

    logout(): void {
        this.authService.clear();
        this.router.navigateByUrl('/');
    }
}