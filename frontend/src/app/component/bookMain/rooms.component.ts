import { Component } from '@angular/core';
import { RoomRepository } from 'src/app/repository/room.repository';
import { RoomDTO } from 'src/app/model/roomDTO.model';

/**
 * Component - RoomsComponent
 * Component when the administrator clicks the 'Rooms' btn
 */
@Component({
  templateUrl: 'rooms.component.html',
  styleUrls: ['../../app.component.css']
})
export class RoomsComponent {
  /**
   * Constructor
   */
  constructor(private roomRepository: RoomRepository) {}

  /**
   * Get method to get all rooms
   */
  get rooms(): RoomDTO[] {
    return this.roomRepository.getRooms();
  }

  /**
   * update the room
   */
  updateRoom(room: RoomDTO): void {
    // make room status enable or disable

    room.room_status = room.room_status == 'true' ? 'false' : 'true';
    this.roomRepository.updateRoom(room);
  }
}
