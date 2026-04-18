import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-post-donation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-donation-modal.html',
  styleUrls: ['./post-donation-modal.css']
})
export class PostDonationModalComponent implements OnInit {

  constructor(private donationService: DonationService) {}

  @Output() close = new EventEmitter()

  mealType = 'lunch'
  quantity = 0
  foodType = ''

  customMealType = ''
  customFoodType = ''

  latitude: number | null = null
  longitude: number | null = null

  address = ''

  userId: number | null = null

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

if(error.code === 1){
alert("Please allow location permission")
}
else{
alert("Unable to detect location")
}

}

)

}



getAddressFromLatLng(){

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

}



submit() {

if (!this.quantity || this.quantity <= 0) {
alert('Enter quantity')
return
}

if (this.mealType === 'others' && !this.customMealType.trim()) {
alert('Enter meal type')
return
}

if (this.foodType === 'others' && !this.customFoodType.trim()) {
alert('Enter food type')
return
}

if (!this.latitude || !this.longitude) {
alert('Detect location')
return
}

const finalMealType =
this.mealType === 'others'
? this.customMealType
: this.mealType


const finalFoodType =
this.foodType === 'others'
? this.customFoodType
: this.foodType


const payload = {

mealType: finalMealType,
quantity: this.quantity,
foodType: finalFoodType,
latitude: this.latitude,
longitude: this.longitude,
address: this.address,
userId: this.userId

}


this.donationService.postDonation(payload)
.subscribe({

next: () => {

alert("Donation posted successfully")
this.close.emit()

},

error: () => {

alert("Failed to post donation")

}

})

}

}