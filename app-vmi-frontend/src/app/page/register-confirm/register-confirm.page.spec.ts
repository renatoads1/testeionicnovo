import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConfirmPage } from './register-confirm.page';

describe('RegisterConfirmPage', () => {
  let component: RegisterConfirmPage;
  let fixture: ComponentFixture<RegisterConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterConfirmPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
