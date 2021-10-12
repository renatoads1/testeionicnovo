import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentClientPage } from './equipment-client.page';

describe('EquipmentClientPage', () => {
  let component: EquipmentClientPage;
  let fixture: ComponentFixture<EquipmentClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentClientPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
