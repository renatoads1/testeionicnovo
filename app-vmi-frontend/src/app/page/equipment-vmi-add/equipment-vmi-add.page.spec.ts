import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentVmiAddPage } from './equipment-vmi-add.page';

describe('EquipmentVmiAddPage', () => {
  let component: EquipmentVmiAddPage;
  let fixture: ComponentFixture<EquipmentVmiAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentVmiAddPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentVmiAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
