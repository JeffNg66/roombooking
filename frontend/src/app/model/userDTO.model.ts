/**
 * UserDTO class - user login & register dto
 */
export class UserDTO {
    constructor(
        public id?: number, 
        public name?: string, 
        public job?: string,
        public phone_no?: number,
        public email?: string,
        public password?: string, 
        public status?: string, 
        public role_id?: number){}
}