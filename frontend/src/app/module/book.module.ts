import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookHeadComponent } from '../component/bookHead/bookHead.component';
import { LoginSummaryComponent } from '../component/bookHead/loginSummary.component';
import { FlashComponent } from '../component/bookMain/flash.component';
import { BookModelModule } from './bookModel.module';
import { RegisterComponent } from '../component/bookMain/register.component';

@NgModule({
    imports: [BookModelModule, BrowserModule, FormsModule, RouterModule],
    declarations: [BookHeadComponent, LoginSummaryComponent, FlashComponent, RegisterComponent],
    exports: [BookHeadComponent, FlashComponent, RegisterComponent]
})
export class BookModule {}