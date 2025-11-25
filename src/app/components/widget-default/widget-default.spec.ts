import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDefault } from './widget-default';

describe('WidgetDefault', () => {
  let component: WidgetDefault;
  let fixture: ComponentFixture<WidgetDefault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetDefault]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetDefault);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
