import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchListComponent } from './merch-list.component';

describe('MerchListComponent', () => {
  let component: MerchListComponent;
  let fixture: ComponentFixture<MerchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
