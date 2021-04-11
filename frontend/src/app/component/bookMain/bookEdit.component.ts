import { Component, SimpleChange, Inject } from '@angular/core';
import { BookDTO } from 'src/app/model/bookDTO.model';
import { NgForm } from '@angular/forms';
import { RoomDTO } from 'src/app/model/roomDTO.model';
import * as moment from 'moment';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from 'src/app/model/user.model';
import { BookRepository } from 'src/app/repository/book.repository';
import { Router } from '@angular/router';
import { RoomRepository } from 'src/app/repository/room.repository';
import { SHARED_STATE, SharedState } from 'src/app/model/sharedState.model';
import { Observer } from 'rxjs';
import { DateUtils } from 'src/app/model/dateUtils.model';
import Notify from '../../../assets/js/notify.js';
import { UserRole } from 'src/app/model/userRole.enum.js';

/**
 * BookEditComponent - Edit component for booking
 */
@Component({
  templateUrl: 'bookEdit.component.html'
})
export class BookEditComponent {
  // book dto object
  bookDTO: BookDTO = new BookDTO();

  // book start time, receive value from form
  start_time: string = null;
  // book end time, receive value from form
  end_time: string = null;

  // form flags
  submitted: boolean = false;
  sent: boolean = false;
  private notify = new Notify();

  /**
   * Constructor
   */
  constructor(
    private user: User,
    public bookRepository: BookRepository,
    private router: Router,
    private dateUtils: DateUtils,
    @Inject(SHARED_STATE) private observer: Observer<SharedState>
  ) {}

  /**
   * Async ngOnInit()
   */
  async ngOnInit(): Promise<void> {
    await this.getRoomsAsync();
  }

  /**
   * Async getRooms()
   */
  async getRoomsAsync(): Promise<any> {
    await this.bookRepository.getRoomsAsync().then(resolve => {
      return resolve;
    });
  }

  /**
   * Submit form
   */
  submitForm(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      // construct bookDTO object
      this.bookDTO.name = this.user.name;
      this.bookDTO.job = this.user.job;
      if (this.start_time != null && this.end_time != null) {
        this.bookDTO.booking_start_time = moment(
          this.dateUtils
            .timeToDate(this.start_time, this.dateUtils.selectedDate)
            .getTime()
        ).toLocaleString();
        this.bookDTO.booking_end_time = moment(
          this.dateUtils
            .timeToDate(this.end_time, this.dateUtils.selectedDate)
            .getTime()
        ).toLocaleString();
      }
      if (this.bookDTO.room_name == null) {
        this.bookDTO.room_name = this.bookRepository.rooms[0].room_name;
      }

      // add booking
      let addResult = this.bookRepository.addBook(this.bookDTO);

      if (addResult == false) {
        // observe shared state
        this.observer.next(new SharedState());

        // reset the status
        this.submitted = false;
        this.sent = true;

        // naviagate
        if (this.user.role_id == 1) {
          this.router.navigateByUrl('/book/main/bookings');
        } else {
          this.router.navigateByUrl('/book/bookings');
        }
      }
    }
  }

  // update room name and room seat count
  change(value: string): void {
    // update room name
    this.bookDTO.room_name = value;
    // update seat count
    let index = this.bookRepository.rooms.findIndex(r => r.room_name == value);
    this.bookRepository.seats = this.bookRepository.rooms.map(
      r => r.no_of_seat
    )[index];
    // update available room start time
    this.bookRepository.roomStartTime = this.bookRepository.rooms.map(r => r.room_start_time)[index];
    // update available room end time
    this.bookRepository.roomEndTime = this.bookRepository.rooms.map(r => r.room_end_time)[index];
  }

  /**
   * navigate to calend pane
   */
  navigateToCalend() {
    if (this.user.role_id == 1) {
      this.router.navigateByUrl('/book/main/bookings');
    } else {
      this.router.navigateByUrl('/book/bookings');
    }
  }
}
