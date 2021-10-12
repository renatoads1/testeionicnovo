import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketClientAddPage } from './ticket-client-add.page';

describe('TicketClientAddPage', () => {
  let component: TicketClientAddPage;
  let fixture: ComponentFixture<TicketClientAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketClientAddPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketClientAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
