import { Component, Optional } from "@angular/core";
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import {Category} from '../../model/category.enum';
import { BookRepository } from 'src/app/repository/book.repository';
import { BookInfoComponent } from './bookInfo.component';
import { UserRole } from 'src/app/model/userRole.enum';

/**
 * Book Component - parent component for booking
 */
@Component({
    templateUrl: 'book.component.html'
})
export class BookComponent{
    // selected category : 'staffs', 'rooms' or 'bookings'
    selectedCategory: Category = Category.Staffs;
    
    // For enabling the enum type use in the template html
    category = Category;
    
    // For user role
    userRole = UserRole;
    
    /**
     * Constructor
     */
    constructor(private router: Router, public authService: AuthService, public user: User){}

    // When click the 'Staffs' category
    onClickStaffs(): void {
        this.selectedCategory = Category.Staffs;
        this.router.navigateByUrl('/book/main/staffs');
    }

    // When click the 'Rooms' category
    onClickRooms(): void {
        this.selectedCategory = Category.Rooms;
        this.router.navigateByUrl('/book/main/rooms');
    }

    // When click the 'Bookings' category
    onClickBookings(): void {
        this.selectedCategory = Category.Bookings;        
        this.router.navigateByUrl('/book/main/bookings');
    }
}