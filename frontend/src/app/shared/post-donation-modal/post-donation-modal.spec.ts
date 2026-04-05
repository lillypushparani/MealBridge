import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDonationModal } from './post-donation-modal';

describe('PostDonationModal', () => {
  let component: PostDonationModal;
  let fixture: ComponentFixture<PostDonationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDonationModal],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDonationModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
