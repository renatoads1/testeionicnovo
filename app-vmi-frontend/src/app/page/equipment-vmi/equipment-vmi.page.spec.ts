import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentVmiPage } from './equipment-vmi.page';

describe('EquipmentVmiPage', () => {
  let component: EquipmentVmiPage;
  let fixture: ComponentFixture<EquipmentVmiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentVmiPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentVmiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
