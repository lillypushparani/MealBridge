import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
@Component({
  selector: 'app-request-food-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-food-modal.html',
  styleUrls: ['./request-food-modal.css']
})
export class RequestFoodModalComponent implements OnInit {

  constructor(private requestService: RequestService, private cdr: ChangeDetectorRef) {}

  @Output() close = new EventEmitter()

  mealType = 'lunch'
  quantity: number | null = null

  customMealType = ''

  latitude: number | null = null
  longitude: number | null = null
  address = ''

  locationDetected = false
  userId: number | null = null

  mealTypes = [
    'breakfast',
    'lunch',
    'dinner',
    'others'
  ]

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    this.userId = user?.id
  }


  detectLocation() {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude

        this.locationDetected = true

        this.getAddressFromLatLng()

      },

      (error) => {

        console.error(error)

        if (error.code === 1) {
          alert("Please allow location permission")
        } else {
          alert("Unable to detect location")
        }

      }

    )

  }


  getAddressFromLatLng() {

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${this.latitude}&lon=${this.longitude}&format=json`
    )
      .then(res => res.json())
      .then(data => {
        this.address = data.display_name
      })
      .catch(() => {
        this.address = "Location detected"
      })
      this.cdr.detectChanges();
  }


  submit() {

    if (!this.quantity || this.quantity <= 0) {
      alert("Enter people count")
      return
    }

    if (this.mealType === 'others' && !this.customMealType.trim()) {
      alert("Enter meal type")
      return
    }

    if (!this.latitude || !this.longitude) {
      alert("Detect location")
      return
    }

    const finalMealType =
      this.mealType === 'others'
        ? this.customMealType
        : this.mealType

    const payload = {

      mealType: finalMealType,
      quantity: this.quantity,
      latitude: this.latitude,
      longitude: this.longitude,
      address: this.address,
      userId: this.userId

    }

    this.requestService.postRequest(payload)
      .subscribe({

        next: () => {
          alert("Request posted successfully")
          this.close.emit()
        },

        error: () => {
          alert("Failed to post request")
        }

      })

  }

}