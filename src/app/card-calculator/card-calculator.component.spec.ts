import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCalculatorComponent } from './card-calculator.component';

describe('CardCalculatorComponent', () => {
  let component: CardCalculatorComponent;
  let fixture: ComponentFixture<CardCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
