import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteUpdateLogComponent } from './site-update-log.component';

describe('SiteUpdateLogComponent', () => {
  let component: SiteUpdateLogComponent;
  let fixture: ComponentFixture<SiteUpdateLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteUpdateLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteUpdateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
