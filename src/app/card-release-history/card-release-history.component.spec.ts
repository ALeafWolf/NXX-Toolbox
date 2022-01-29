import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReleaseHistoryComponent } from './card-release-history.component';

describe('CardReleaseHistoryComponent', () => {
  let component: CardReleaseHistoryComponent;
  let fixture: ComponentFixture<CardReleaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardReleaseHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReleaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
