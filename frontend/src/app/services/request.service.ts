import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Create a new request
  postRequest(data: any) {
    return this.http.post(
      `${this.baseUrl}/requests`,
      data
    );
  }

  // Get all active requests
  getActiveRequests() {
    return this.http.get(
      `${this.baseUrl}/requests/active`
    );
  }

  // Get all requests by a specific user
  getMyRequests(userId: number) {
    return this.http.get(
      `${this.baseUrl}/requests/user/${userId}`
    );
  }

  // Get nearby requests within a radius
  getNearbyRequests(lat: number, lng: number, radius: number = 20) {
    let params = new HttpParams()
      .set('lat', lat.toString())
      .set('lng', lng.toString())
      .set('radius', radius.toString());

    return this.http.get(
      `${this.baseUrl}/requests/nearby`,
      { params }
    );
  }

  // Mark a request as completed
  completeRequest(id: number) {
    return this.http.put(
      `${this.baseUrl}/requests/${id}/complete`,
      {}
    );
  }

  // Delete a request
  deleteRequest(id: number) {
    return this.http.delete(
      `${this.baseUrl}/requests/${id}`
    );
  }

}