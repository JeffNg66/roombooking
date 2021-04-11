import { Component } from "@angular/core";
import { AuthService } from 'src/app/service/auth.service';

/**
 * BookHeadComponent
 */
@Component({
    selector: 'book-head',
    templateUrl: 'bookHead.component.html',
    styleUrls: ['loginSummary.component.css']
})
export class BookHeadComponent{
    /**
     * Constructor
     */
    constructor(public authService: AuthService) {}
}