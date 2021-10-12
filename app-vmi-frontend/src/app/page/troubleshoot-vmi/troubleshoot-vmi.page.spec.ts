import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootVmiPage } from './troubleshoot-vmi.page';

describe('TroubleshootVmiPage', () => {
  let component: TroubleshootVmiPage;
  let fixture: ComponentFixture<TroubleshootVmiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TroubleshootVmiPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootVmiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
