/**
 * BookDTO class - dto for booking info
 */
export class BookDTO {
    constructor (
        public id?: number,
        public name?: string,
        public job?: string,
        public room_name?: string,
        public booking_start_time?: string,
        public booking_end_time?: string
    ) {}
}