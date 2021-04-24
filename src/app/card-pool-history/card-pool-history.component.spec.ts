import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPoolHistoryComponent } from './card-pool-history.component';

describe('CardPoolHistoryComponent', () => {
  let component: CardPoolHistoryComponent;
  let fixture: ComponentFixture<CardPoolHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPoolHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPoolHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
