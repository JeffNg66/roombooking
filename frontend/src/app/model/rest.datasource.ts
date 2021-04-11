import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './user.model';
import { UserDTO } from './userDTO.model';
import { BASE_URL } from './url.config';
import { RoomDTO } from './roomDTO.model';
import { DateUtils } from './dateUtils.model';
import { BookDTO } from './bookDTO.model';
import * as moment from 'moment';
import Notify from '../../assets/js/notify.js';
/**
 * RestDataSource class - EndPoint data source
 */
@Injectable()
export class RestDataSource {
  auth_token: string = null;
  private notify = new Notify();
  constructor(
    private httpClient: HttpClient,
    private user: User,
    public dateUtils: DateUtils
  ) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.httpClient
      .post<any>(
        `${BASE_URL}/users/login`,
        {
          name: username,
          password: password
        },
        { observe: 'response' }
      )
      .pipe(
        map(response => {
          if (response.status == 200) {
            // set the access token
            this.auth_token = response.body.accessToken;
            // set the user info
            this.user.clear();
            this.resetUser(response);

            return true;
          }

          return false;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status == 400) {
            this.notify.notification(
              'error',
              'Please enter correct username and password!'
            );
          }
          return throwError(error.message || 'server error');
        })
      );
  }

  private resetUser(response: any): void {
    this.user.id = response.body.id;
    this.user.email = response.body.email;
    this.user.name = response.body.name;
    this.user.job = response.body.job;
    this.user.phone_no = response.body.phone_no;
    this.user.password = response.body.password;
    this.user.role_id = response.body.role_id;
    this.user.status = response.body.status;
  }

  /**
   * Get users info from HttpClient
   */
  getUsers(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${BASE_URL}/users`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.auth_token}` })
    });
  }

  /**
   * Update user info
   */
  updateUser(user: UserDTO): Observable<UserDTO> {
    return this.httpClient
      .post<UserDTO>(`${BASE_URL}/users/${user.id}`, user, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.auth_token}`
        }),
        observe: 'response'
      })
      .pipe(
        map(response => {
          if (response.status == 200) {
            let body = response.body;
            return new UserDTO(
              body.id,
              body.name,
              body.job,
              body.phone_no,
              body.email,
              body.password,
              body.status,
              body.role_id
            );
          } else {
            return null;
          }
        })
      );

    // let testObj: UserDTO = new UserDTO(1, 'up', 'upjob', 112, 'upemail', 'uppass', true, 2);
    // return from([testObj]);
  }

  /**
   * Add new staff
   */
  addUser(user: UserDTO): Observable<boolean> {
    return this.httpClient
      .put<UserDTO>(`${BASE_URL}/users`, user, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status == 201) {
            this.notify.notification('success', 'Register success!');
            return true;
          }
          return false;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status == 400) {
            this.notify.notification(
              'error',
              'Please enter correct register information!'
            );
          } else if (error.status == 409) {
            this.notify.notification(
              'error',
              'There is the user with this information!'
            );
          }
          return throwError(error.message || 'server error');
        })
      );
  }

  /**
   * Get rooms info from HttpClient
   */
  getRooms(): Observable<RoomDTO[]> {
    return this.httpClient.get<RoomDTO[]>(`${BASE_URL}/rooms`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.auth_token}` })
    });
  }

  /**
   * Update room info
   */
  updateRoom(room: RoomDTO): Observable<RoomDTO> {
    return this.httpClient
      .post<RoomDTO>(`${BASE_URL}/rooms/${room.room_id}`, room, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.auth_token}`
        }),
        observe: 'response'
      })
      .pipe(
        map(response => {
          if (response.status == 200) {
            let body = response.body;
            this.notify.notification('success', 'Success!');
            return new RoomDTO(
              body.room_id,
              body.room_name,
              body.no_of_seat,
              body.room_status,
              body.room_start_time,
              body.room_end_time
            );
          } else {
            return null;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.error == 'Booking time is not validated!') {
            this.notify.notification('error', 'Booking time is not validated!');
          } else if (error.error == 'There is no room with this information!') {
            this.notify.notification(
              'warning',
              'There is no room with this information!'
            );
          } else if (error.status == 500) {
            this.notify.notification('error', 'server error!');
          } else {
            this.notify.notification(
              'error',
              'This room information is not correct!'
            );
          }
          return throwError(error.message || 'server error');
        })
      );

    let testObj: RoomDTO = new RoomDTO(1, 'up', 10, 'true');
    return from([testObj]);
  }

  /**
   * Add room info
   */
  addRoom(room: RoomDTO): Observable<RoomDTO> {
    return this.httpClient
      .put<RoomDTO>(`${BASE_URL}/rooms`, room, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.auth_token}`
        }),
        observe: 'response'
      })
      .pipe(
        map(response => {
          if (response.status == 201) {
            this.notify.notification('success', 'Add success!');
            return response.body;
          } else {
            return null;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.error == 'Room time is not validated!') {
            this.notify.notification('error', 'Room time is not validated!');
          } else if (error.status == 409) {
            this.notify.notification(
              'warning',
              'There is room with this room information!'
            );
          } else if (error.status == 500) {
            this.notify.notification('error', 'Server error!');
          } else {
            this.notify.notification(
              'error',
              'This room information is not correct!'
            );
          }
          return throwError(error.message || 'server error');
        })
      );

    let testObj: RoomDTO = new RoomDTO(1, 'up', 10, 'true');
    return from([testObj]);
  }

  /**
   * Get books by user and selected date
   */
  getBooks(): Observable<BookDTO[]> {
    let selectedDate: Date = this.dateUtils.selectedDate;
    let strDate: string = moment(selectedDate).format('yyyy-MM-DD');
    return this.httpClient.get<BookDTO[]>(
      `${BASE_URL}/bookings/${this.user.name}/${strDate}`,
      {
        headers: new HttpHeaders({ Authorization: `Bearer ${this.auth_token}` })
      }
    );
  }

  /**
   * Get book dates by user
   */
  getBookDatesByUser(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${BASE_URL}/dates/${this.user.name}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.auth_token}` })
    });
  }

  /**
   * Delete book by id
   */
  deleteBookById(id: number): Observable<boolean> {
    return this.httpClient
      .delete<number>(`${BASE_URL}/bookings/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.auth_token}`
        }),
        observe: 'response'
      })
      .pipe(
        map(response => {
          if (response.status == 204) {
            this.notify.notification('success', '');
            return true;
          } else {
            return false;
          }
        })
      );
  }

  /**
   * Add book
   */
  addBook(bookDTO: BookDTO): Observable<BookDTO> {
    return this.httpClient
      .put<BookDTO>(`${BASE_URL}/bookings`, bookDTO, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.auth_token}`
        }),
        observe: 'response'
      })
      .pipe(
        map(response => {
          if (response.status == 201) {
            this.notify.notification('success', 'Success!');
            return response.body;
          }
          return null;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.error == 'This staff is disabled user!') {
            this.notify.notification('error', 'This staff is disabled user!');
          } else if (
            error.error == 'There is no user with this booking information!'
          ) {
            this.notify.notification(
              'error',
              'There is no user with this booking information!'
            );
          } else if (error.error == 'This time information is not correct!') {
            this.notify.notification(
              'error',
              'This time information is not correct!'
            );
          } else if (
            error.error ==
            'Booking end time must be late than booking start time!'
          ) {
            this.notify.notification(
              'error',
              'Booking end time must be late than booking start time!'
            );
          } else if (error.error == 'Booking time was duplicated!') {
            this.notify.notification('error', 'Booking time was duplicated!');
          } else if (
            error.error ==
            'Booking time is out of room start time and end time!'
          ) {
            this.notify.notification(
              'error',
              'Booking time is out of room start time and end time!'
            );
          } else if (error.status == 409) {
            this.notify.notification(
              'warning',
              'There is user with this information!'
            );
          } else {
            this.notify.notification(
              'error',
              'Your booking information is not correct!'
            );
          }
          return throwError(error.message || 'server error');
        })
      );
  }
}
