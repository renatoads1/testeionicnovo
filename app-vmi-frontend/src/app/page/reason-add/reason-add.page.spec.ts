import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonAddPage } from './reason-add.page';

describe('ReasonAddPage', () => {
  let component: ReasonAddPage;
  let fixture: ComponentFixture<ReasonAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReasonAddPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
