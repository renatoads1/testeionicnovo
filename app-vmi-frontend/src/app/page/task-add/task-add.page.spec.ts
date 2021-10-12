import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddPage } from './task-add.page';

describe('TaskAddPage', () => {
  let component: TaskAddPage;
  let fixture: ComponentFixture<TaskAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAddPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
