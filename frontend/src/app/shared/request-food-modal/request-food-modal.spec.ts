import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFoodModal } from './request-food-modal';

describe('RequestFoodModal', () => {
  let component: RequestFoodModal;
  let fixture: ComponentFixture<RequestFoodModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestFoodModal],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestFoodModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
