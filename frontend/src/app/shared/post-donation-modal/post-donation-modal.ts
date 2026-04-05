import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-donation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-donation-modal.html',
  styleUrls: ['./post-donation-modal.css']
})
export class PostDonationModalComponent {

  @Output() close = new EventEmitter()

  mealType = 'lunch'
  quantity = ''
  foodType = ''
  customMealType = ''
  customFoodType = ''
  locationDetected = false

  mealTypes = [
    'breakfast',
    'lunch',
    'dinner',
    'others'
  ]

  foodTypes = [
    'Vegetarian',
    'Non Vegetarian',
    'South Indian',
    'North Indian',
    'Mixed',
    'others'
  ]

  detectLocation() {

    navigator.geolocation.getCurrentPosition(() => {
      this.locationDetected = true
    })

  }

  submit() {

    if (!this.quantity) {
      alert("Enter quantity")
      return
    }

    if (this.mealType === 'others' && !this.customMealType.trim()) {
      alert("Enter custom meal type")
      return
    }

    if (this.foodType === 'others' && !this.customFoodType.trim()) {
      alert("Enter custom food type")
      return
    }

    // Use custom values if "others" is selected
    const finalMealType = this.mealType === 'others' ? this.customMealType : this.mealType;
    const finalFoodType = this.foodType === 'others' ? this.customFoodType : this.foodType;

    console.log('Donation:', {
      mealType: finalMealType,
      quantity: this.quantity,
      foodType: finalFoodType
    });

    this.close.emit()

  }

}