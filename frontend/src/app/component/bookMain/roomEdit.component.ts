import { Component } from '@angular/core';
import { RoomDTO } from 'src/app/model/roomDTO.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomRepository } from 'src/app/repository/room.repository';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Time } from '@angular/common';
import { DateUtils } from 'src/app/model/dateUtils.model';
import Notify from '../../../assets/js/notify.js';

/**
 * RoomEditComponent - Component for editing or creating room
 */
@Component({
  templateUrl: 'roomEdit.component.html',
  styleUrls: ['../../app.component.css']
})
export class RoomEditComponent {
  room: RoomDTO = new RoomDTO(); // RoomDTO container
  editing: boolean = false; // edit or create?
  sent: boolean = false; // room data sent?
  submitted: boolean = false; // form submitted or not?

  changed_start_time: string = null; // when editing the room info, store the changed start time
  changed_end_time: string = null; // when editing the room info, store the changed end time
  private notify = new Notify();

  /**
   * Constructor
   */
  constructor(
    private activateRoute: ActivatedRoute,
    private roomRepository: RoomRepository,
    private router: Router,
    private dateUtils: DateUtils
  ) {
    this.editing = this.activateRoute.snapshot.params['mode'] == 'edit';
    // If room edit state
    if (this.editing) {
      Object.assign(
        this.room,
        this.roomRepository.getRoom(this.activateRoute.snapshot.params['id'])
      );
    }
  }

  /**
   * Submit form
   */
  submitForm(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      if (this.changed_start_time != null) {
        let start_time: Date = this.dateUtils.timeToDate(
          this.changed_start_time
        );
        this.room.room_start_time = moment(
          start_time.getTime()
        ).toLocaleString();
      }
      if (this.changed_end_time != null) {
        let end_time: Date = this.dateUtils.timeToDate(this.changed_end_time);
        this.room.room_end_time = moment(end_time.getTime()).toLocaleString();
      }
      if (this.editing) {
        // In the case of editing room
        this.roomRepository.updateRoom(this.room);
      } else {
        // In the case of creating room
        this.room.room_status = 'true';
        this.roomRepository.addRoom(this.room);
      }
      this.sent = true;
      this.submitted = false;
      if (this.editing) {
        this.router.navigateByUrl('/book/main/rooms');
      }
      if (!this.editing) {
        this.router.navigateByUrl('/book/main/rooms');
      }
    }
  }
}
