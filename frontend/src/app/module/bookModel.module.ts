import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { RestDataSource } from '../model/rest.datasource';
import { UserRepository } from '../repository/user.repository';
import { RoomRepository } from '../repository/room.repository';
import { DateUtils } from '../model/dateUtils.model';
import { BookRepository } from '../repository/book.repository';

@NgModule({
    imports: [HttpClientModule],
    providers: [User, AuthService, RestDataSource, UserRepository, RoomRepository, BookRepository, DateUtils]
})
export class BookModelModule {}