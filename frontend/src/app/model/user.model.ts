import { Injectable } from '@angular/core';

/**
 * User Injectable - the user when the login succeed
 */
@Injectable()
export class User {
    public id: number;
    public name : string = null;
    public job : string = null;
    public phone_no : number;
    public email : string = null;
    public password : string = null;
    public status: boolean = false;
    public role_id: number;

    // Clear login user info
    clear(): void {
        this.id = 0;
        this.name = null;
        this.job = null;
        this.phone_no = null;
        this.email = null;
        this.password = null;
        this.status = false;
        this.role_id = 0;
    }
}