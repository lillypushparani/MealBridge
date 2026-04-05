import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-food-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-food-modal.html',
  styleUrls: ['./request-food-modal.css']
})
export class RequestFoodModalComponent {

  @Output() close = new EventEmitter()

  mealType = 'lunch'
  peopleCount = ''
  customMealType = ''
  locationDetected = false

  mealTypes = [
    'breakfast',
    'lunch',
    'dinner',
    'others'
  ]

  detectLocation() {

    navigator.geolocation.getCurrentPosition(() => {
      this.locationDetected = true
    })

  }

  submit() {

    if (!this.peopleCount) {
      alert("Enter people count")
      return
    }

    if (this.mealType === 'others' && !this.customMealType.trim()) {
      alert("Enter custom meal type")
      return
    }

    // Use custom value if "others" is selected
    const finalMealType = this.mealType === 'others' ? this.customMealType : this.mealType;

    console.log('Request:', {
      mealType: finalMealType,
      peopleCount: this.peopleCount
    });

    this.close.emit()

  }

}