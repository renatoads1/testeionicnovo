import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTutorialPage } from './add-tutorial.page';

describe('AddTutorialPage', () => {
  let component: AddTutorialPage;
  let fixture: ComponentFixture<AddTutorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTutorialPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTutorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
