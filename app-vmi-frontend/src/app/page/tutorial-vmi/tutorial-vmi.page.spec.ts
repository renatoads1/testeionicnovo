import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialVmiPage } from './tutorial-vmi.page';

describe('TutorialVmiPage', () => {
  let component: TutorialVmiPage;
  let fixture: ComponentFixture<TutorialVmiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TutorialVmiPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialVmiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
