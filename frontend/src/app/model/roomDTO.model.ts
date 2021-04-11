/**
 * RoomDTO class
 * Contains Room Info
 */
export class RoomDTO {
    constructor(
        public room_id?: number,
        public room_name?: string,
        public no_of_seat?: number,
        public room_status?: string,
        public room_start_time?: string,
        public room_end_time?: string,
    ){}
}