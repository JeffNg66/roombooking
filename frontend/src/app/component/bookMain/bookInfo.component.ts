import { Component, Host, Inject, Optional } from '@angular/core';
// import { BookComponent } from './book.component';
import { BookRepository } from 'src/app/repository/book.repository';
import { DateUtils } from 'src/app/model/dateUtils.model';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/model/userRole.enum';

/**
 * BookInfo component - component for book info
 */
@Component({
  templateUrl: 'bookInfo.component.html',
  styleUrls: ['../../app.component.css']
})
export class BookInfoComponent {
  disable: Boolean = false;
  today: Date = new Date();

  // User role
  userRole = UserRole;

  /**
   * Constructor
   */
  constructor(
    private router: Router,
    public bookRepository: BookRepository,
    public dateUtils: DateUtils,
    public user: User
  ) {
    if (
      this.dateUtils.selectedDate.getTime() + 3600000 * 24 <
      this.today.getTime()
    ) {
      this.disable = true;
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getBooksAsync();
  }

  /**
   * Get all book infos by date & user - async
   */
  async getBooksAsync(): Promise<any> {
    await this.bookRepository.getBooksAsync().then(resolve => {
      return resolve;
    });
  }

  /**
   * Delete book info by id
   */
  deleteBookById(id: number): void {
    this.bookRepository.deleteBookById(id);
  }

  /**
   * navigate to edit pane
   */
  navigateToEdit() {
    if (this.user.role_id == 1) {
      this.router.navigateByUrl('/book/main/bookings/create');
    } else {
      this.router.navigateByUrl('/book/bookedits');
    }
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
