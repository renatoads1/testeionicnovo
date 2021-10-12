import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootAddPage } from './troubleshoot-add.page';

describe('TroubleshootAddPage', () => {
  let component: TroubleshootAddPage;
  let fixture: ComponentFixture<TroubleshootAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TroubleshootAddPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
