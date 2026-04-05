import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDonationModalComponent } from '../../shared/post-donation-modal/post-donation-modal'
import { RequestFoodModalComponent } from '../../shared/request-food-modal/request-food-modal'

import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,PostDonationModalComponent,RequestFoodModalComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  user = {
    name: "Lilly",
    role: "donor"
  }

  nearbyPosts = [
    {
      id: 1,
      mealType: 'Vegetables',
      quantity: '15 kg',
      address: 'Downtown Market',
      time: '2 hours ago',
      donor: 'Farm Fresh Co',
      foodType: 'veg'
    },
    {
      id: 2,
      mealType: 'Bakery Items',
      quantity: '8 items',
      address: 'Main Street Bakery',
      time: '45 mins ago',
      donor: 'Morning Bakery',
      foodType: 'mixed'
    },
    {
      id: 3,
      mealType: 'Rice & Grains',
      quantity: '25 kg',
      address: 'Grain Warehouse',
      time: '3 hours ago',
      donor: 'Grain Supplies Ltd',
      foodType: 'veg'
    }
  ]
  
  myPosts = [
    {
      id: 101,
      mealType: 'Home-cooked Meals',
      quantity: '20 meals',
      address: 'My Kitchen',
      time: '5 days ago',
      status: 'Active',
      foodType: 'mixed'
    },
    {
      id: 102,
      mealType: 'Fresh Fruits',
      quantity: '12 kg',
      address: 'Fruit Market',
      time: '2 days ago',
      status: 'Active',
      foodType: 'veg'
    }
  ]
  
  showModal = false
  showRequestModal = false

  constructor(private router: Router) {}

  goProfile() {
    this.router.navigate(['/profile']);
  }

  toggleAction() {
    if (this.user.role === 'donor') {
      this.showModal = true;
    } else {
      this.showRequestModal = true;
    }
  }

}