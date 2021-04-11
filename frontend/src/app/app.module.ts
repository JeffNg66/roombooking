import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BookModule } from './module/book.module';
import { StoreFirstGuard } from './storeFirst.guard';
import { SHARED_STATE, SharedState } from './model/sharedState.model';
import { Subject } from 'rxjs';
import {BookChildrenModule} from './module/bookChildren.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    BookModule
  ],
  providers: [StoreFirstGuard, {provide: SHARED_STATE, useValue: new Subject<SharedState>()}],
  bootstrap: [AppComponent]
})
export class AppModule {}
