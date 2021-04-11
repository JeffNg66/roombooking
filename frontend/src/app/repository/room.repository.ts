import { Injectable } from "@angular/core";
import { RoomDTO } from '../model/roomDTO.model';
import { RestDataSource } from '../model/rest.datasource';

@Injectable()
export class RoomRepository {
    // container to store the room info
    public rooms: RoomDTO[] = [];
    // is loaded?
    public loaded = false;   

    /**
     * Constructor
     */
    constructor(private dataSource: RestDataSource) {
    }

    /**
     * load rooms from data source
     */
    loadRooms(): void {
        this.dataSource.getRooms().subscribe(rooms => {
            this.rooms = rooms;            
        })
        this.loaded = true;
    }

    /**
     * Get all rooms info
     */
    getRooms(): RoomDTO[] {
        if (!this.loaded) {
            this.loadRooms();
        }
        return this.rooms.filter(r => r.room_status == 'true');
    }

    /**
     * Update room info
     */
    updateRoom(room: RoomDTO): void {        
        this.dataSource.updateRoom(room).subscribe(room => {
            if (room != null) {
                this.rooms.splice(this.rooms.findIndex(r => r.room_id == room.room_id), 1, room);
            }

        })
    }

    /**
     * Add room info
     */
    addRoom(room: RoomDTO): void {
        this.dataSource.addRoom(room).subscribe(room => {
            this.rooms.push(room);
        });
    }

    /**
     * Get room info by id
     */
    getRoom(id: number): RoomDTO {
        return this.rooms.find(r => r.room_id == id);
    }  

}