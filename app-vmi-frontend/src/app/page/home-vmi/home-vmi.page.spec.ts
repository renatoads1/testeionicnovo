import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVmiPage } from './home-vmi.page';

describe('HomeVmiPage', () => {
  let component: HomeVmiPage;
  let fixture: ComponentFixture<HomeVmiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeVmiPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVmiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
