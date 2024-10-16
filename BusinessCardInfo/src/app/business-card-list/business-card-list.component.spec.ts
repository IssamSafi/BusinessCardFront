import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCardListComponent } from './business-card-list.component';

describe('BusinessCardListComponent', () => {
  let component: BusinessCardListComponent;
  let fixture: ComponentFixture<BusinessCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
