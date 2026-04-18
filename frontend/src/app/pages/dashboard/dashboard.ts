import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDonationModalComponent } from '../../shared/post-donation-modal/post-donation-modal';
import { RequestFoodModalComponent } from '../../shared/request-food-modal/request-food-modal';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PostDonationModalComponent, RequestFoodModalComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  user: any;
  nearbyRequests: any[] = [];
  myPosts: any[] = [];

  showDonationModal = false;
  showRequestModal = false;

  statement = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private requestService: RequestService,
    private donationService: DonationService
  ) {}



  /* ==============================
        INIT
  ============================== */

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem("user") || "{}");

    console.log("User:", this.user);

    this.loadMyPosts();
    this.loadNearby();

  }



  /* ==============================
        LOAD MY POSTS
  ============================== */

  loadMyPosts() {

    if (this.user.role.toLowerCase() === 'donor') {

      this.donationService.getMyDonations(this.user.id)
      .subscribe((res: any) => {

        this.myPosts = res;
        console.log("My Donations:", this.myPosts);
        this.cdr.detectChanges();

      });

    } else {

      this.requestService.getMyRequests(this.user.id)
      .subscribe((res: any) => {

        this.myPosts = res;
        console.log("My Requests:", this.myPosts);
        this.cdr.detectChanges();

      });

    }

  }



  /* ==============================
        LOAD NEARBY
  ============================== */

  loadNearby() {

    if (this.user.role.toLowerCase() === 'donor') {

      this.statement = 'Nearby Requests';

      this.requestService.getActiveRequests()
      .subscribe((res: any) => {

        this.nearbyRequests = res;
        console.log("Nearby Requests:", this.nearbyRequests);
        this.cdr.detectChanges();

      });

    } else {

      this.statement = 'Nearby Donations';

      this.donationService.getActiveDonations()
      .subscribe((res: any) => {

        this.nearbyRequests = res;
        console.log("Nearby Donations:", this.nearbyRequests);
        this.cdr.detectChanges();

      });

    }

  }



  /* ==============================
        NAVIGATION
  ============================== */

  goProfile() {
    this.router.navigate(['/profile']);
  }



  /* ==============================
        OPEN MODALS
  ============================== */

  toggleAction() {

    if (this.user.role.toLowerCase() === 'donor') {
      this.showDonationModal = true;
    } else {
      this.showRequestModal = true;
    }

  }



  /* ==============================
        DELETE POST
  ============================== */

  deletePost(id: number) {

    if (this.user.role.toLowerCase() === 'donor') {

      this.donationService.deleteDonation(id)
      .subscribe(() => {

        this.loadMyPosts();

      });

    } else {

      this.requestService.deleteRequest(id)
      .subscribe(() => {

        this.loadMyPosts();

      });

    }

  }



  /* ==============================
        COMPLETE POST
  ============================== */

  completePost(id: number) {

    if (this.user.role.toLowerCase() === 'donor') {

      this.donationService.completeDonation(id)
      .subscribe(() => {

        this.loadMyPosts();

      });

    } else {

      this.requestService.completeRequest(id)
      .subscribe(() => {

        this.loadMyPosts();

      });

    }

  }

}