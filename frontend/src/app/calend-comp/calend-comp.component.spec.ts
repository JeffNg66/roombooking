import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendCompComponent } from './calend-comp.component';

describe('CalendCompComponent', () => {
  let component: CalendCompComponent;
  let fixture: ComponentFixture<CalendCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
