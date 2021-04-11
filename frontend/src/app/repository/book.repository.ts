import { Injectable } from '@angular/core';
import { RestDataSource } from '../model/rest.datasource';
import { BookDTO } from '../model/bookDTO.model';
import { RoomDTO } from '../model/roomDTO.model';
import Notify from '../../assets/js/notify.js';

@Injectable()
export class BookRepository {
  // books info loaded?
  booksLoaded: boolean = false;
  // rooms info loaded?
  roomsLoaded: boolean = false;
  private notify = new Notify();

  /**
   * Constructor
   */
  constructor(private dataSource: RestDataSource) {}
  // container for books
  books: BookDTO[] = [];
  // container for rooms
  rooms: RoomDTO[] = [];
  // current room's seat count
  seats: number;

  // current room's available start time
  roomStartTime: string;

  // current room's available end time
  roomEndTime: string;

  loadBooks(): void {
    this.dataSource.getBooks().subscribe(books => (this.books = books));
  }

  /**
   * Get bookings asyncronously by user and selected date
   */
  async getBooksAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadBooks();
      resolve(this.books);
    });
  }

  /**
   * Get booking dates asyncronously by user
   */
  async getBookDatesByUserAsync(): Promise<any> {
    return new Promise(resolve => {
      this.dataSource.getBookDatesByUser().subscribe(dates => {
        resolve(dates);
      });
    });
  }

  /**
   * Delete book by id
   */
  deleteBookById(id: number): void {
    this.dataSource.deleteBookById(id).subscribe(res => {
      if (res) {
        this.books.splice(this.books.findIndex(b => b.id == id), 1);
      }
    });
  }

  /**
   * Add book
   */
  addBook(bookDTO: BookDTO): boolean {
    this.dataSource.addBook(bookDTO).subscribe(book => {
      if (book != null) {
        this.books.push(book);
        return true;
      }
    });
    return false;
  }

  /**
   * Async - Get rooms
   */
  async getRoomsAsync(): Promise<any> {
    return new Promise(resolve => {
      this.dataSource.getRooms().subscribe(rooms => {
        this.rooms = rooms.filter(r => r.room_status == 'true');
        this.seats = this.rooms.map(r => r.no_of_seat)[0];
        this.roomStartTime = this.rooms.map(r => r.room_start_time)[0];
        this.roomEndTime = this.rooms.map(r => r.room_end_time)[0];
      });
      resolve(this.rooms);
      resolve(this.seats);
    });
  }
}
