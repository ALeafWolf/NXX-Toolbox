import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardValueSettingComponent } from './card-value-setting.component';

describe('CardValueSettingComponent', () => {
  let component: CardValueSettingComponent;
  let fixture: ComponentFixture<CardValueSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardValueSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardValueSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
