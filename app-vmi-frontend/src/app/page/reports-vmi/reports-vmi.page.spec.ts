import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsVmiPage } from './reports-vmi.page';

describe('ReportsVmiPage', () => {
  let component: ReportsVmiPage;
  let fixture: ComponentFixture<ReportsVmiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsVmiPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsVmiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
