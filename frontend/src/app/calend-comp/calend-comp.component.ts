import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Inject
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Router } from '@angular/router';
import { DateUtils } from '../model/dateUtils.model';
import { BookRepository } from '../repository/book.repository';
import * as moment from 'moment';
import { User } from '../model/user.model';
import { ViewEncapsulation } from '@angular/core';
import { SHARED_STATE, SharedState } from '../model/sharedState.model';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calend-comp',
  templateUrl: './calend-comp.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calend-comp.component.css']
})
export class CalendCompComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  /**
   * Constructor - knows parent Component, BookComponent
   */
  constructor(private modal: NgbModal, private router: Router, private dateUtils: DateUtils, 
    private bookRepository: BookRepository, private user: User,
    @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>) {} 

  async ngOnInit(): Promise<void> {
    await this.setEvents();
    this.stateEvents.subscribe((update) => {      
      this.setEvents();
      this.refresh.next();
    });
    this.refresh.next();
  }

  async setEvents(): Promise<any> {
    let dates = await this.bookRepository.getBookDatesByUserAsync().then(resolve => {
      return resolve;
    });    
    return new Promise(resolve => {
      dates.forEach(date => {
        let start_time = new Date(date.booking_start_time);
        let end_time = new Date(date.booking_end_time);
        let eventObj = {
          start: startOfDay(start_time),
          end: startOfDay(end_time),
          title: '',
          color: colors.yellow
        }
        this.events.push(eventObj);
      })      
      resolve(this.events);
    })    
  }

  /**
   * dayClicked method - when a date clicked
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // if (isSameMonth(date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //   } else {
    //     this.activeDayIsOpen = true;
    //   }
    //   this.viewDate = date;
    // }    
    this.dateUtils.selectedDate = date;
    this.viewDate = date;

    if (this.user.role_id == 1) {
      this.router.navigateByUrl('/book/main/bookinfos');
    } else {
      this.router.navigateByUrl('/book/bookinfos');
    }
    
    
    // let stringDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    // // this.dateEvent.emit(stringDate);
    // this.bookComponent.selectedDate = stringDate;
    // this.router.navigateByUrl('/book/main/bookings/books');
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
