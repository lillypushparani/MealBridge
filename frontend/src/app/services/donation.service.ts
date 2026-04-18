import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Create a new donation
  postDonation(data: any) {
    return this.http.post(
      `${this.baseUrl}/donations`,
      data
    );
  }

  // Get all donations by a specific user
  getMyDonations(userId: number) {
    return this.http.get(
      `${this.baseUrl}/donations/user/${userId}`
    );
  }

  // Get all active donations
  getActiveDonations() {
    return this.http.get(
      `${this.baseUrl}/donations/active`
    );
  }

  // Get nearby donations within a radius
  getNearbyDonations(lat: number, lng: number, radius: number = 20) {
    let params = new HttpParams()
      .set('lat', lat.toString())
      .set('lng', lng.toString())
      .set('radius', radius.toString());

    return this.http.get(
      `${this.baseUrl}/donations/nearby`,
      { params }
    );
  }

  // Mark a donation as completed
  completeDonation(id: number) {
    return this.http.put(
      `${this.baseUrl}/donations/${id}/complete`,
      {}
    );
  }

  // Delete a donation
  deleteDonation(id: number) {
    return this.http.delete(
      `${this.baseUrl}/donations/${id}`
    );
  }
}
