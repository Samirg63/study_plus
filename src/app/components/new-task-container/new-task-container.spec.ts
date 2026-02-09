import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskContainer } from './new-task-container';

describe('NewTaskContainer', () => {
  let component: NewTaskContainer;
  let fixture: ComponentFixture<NewTaskContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaskContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
