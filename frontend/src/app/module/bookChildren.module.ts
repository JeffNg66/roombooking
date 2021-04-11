import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../component/bookMain/login.component';
import { BookComponent } from '../component/bookMain/book.component';
import { StaffsComponent } from '../component/bookMain/staffs.component';
import { RoomsComponent } from '../component/bookMain/rooms.component';
import { RoomEditComponent } from '../component/bookMain/roomEdit.component';
import { AuthGuard } from '../auth.guard';
import { CalendCompComponent } from '../calend-comp/calend-comp.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BookInfoComponent } from '../component/bookMain/bookInfo.component';
import { BookEditComponent } from '../component/bookMain/bookEdit.component';

let routing = RouterModule.forChild([
    { path: 'auth', component: LoginComponent },
    {
      path: 'main',
      component: BookComponent,
      canActivate: [AuthGuard],
      children: [
          {path: 'staffs', component: StaffsComponent},
          {path: 'rooms', component: RoomsComponent},
          {path: 'bookings', component: CalendCompComponent},
          {path: 'bookinfos', component: BookInfoComponent},
          {path: 'bookings/:mode', component: BookEditComponent},
          {path: 'rooms/:mode/:id', component: RoomEditComponent},
          {path: 'rooms/:mode', component: RoomEditComponent},
          {path: '**', redirectTo: 'staffs'}
      ]
    },
    {path: 'bookinfos', component: BookInfoComponent},
    {path: 'bookings', component: CalendCompComponent},
    {path: 'bookedits', component: BookEditComponent},
    { path: '**', redirectTo: 'auth' }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        FlatpickrModule.forRoot()
    ],
    providers: [AuthGuard, BookComponent],
    declarations: [
        LoginComponent,
        BookComponent,
        StaffsComponent,
        RoomsComponent,
        RoomEditComponent,
        CalendCompComponent,
        BookInfoComponent,
        BookEditComponent
    ]
})
export class BookChildrenModule {
    
}