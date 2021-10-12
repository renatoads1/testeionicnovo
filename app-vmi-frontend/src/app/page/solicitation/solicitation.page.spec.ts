import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationPage } from './solicitation.page';

describe('SolicitationPage', () => {
  let component: SolicitationPage;
  let fixture: ComponentFixture<SolicitationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitationPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
