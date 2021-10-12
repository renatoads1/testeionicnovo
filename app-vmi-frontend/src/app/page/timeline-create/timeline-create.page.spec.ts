import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCreatePage } from './timeline-create.page';

describe('TimelineCreatePage', () => {
  let component: TimelineCreatePage;
  let fixture: ComponentFixture<TimelineCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
