import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRssCalculatorComponent } from './card-rss-calculator.component';

describe('CardRssCalculatorComponent', () => {
  let component: CardRssCalculatorComponent;
  let fixture: ComponentFixture<CardRssCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRssCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRssCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
