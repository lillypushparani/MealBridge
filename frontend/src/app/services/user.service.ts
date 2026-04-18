import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  getUser(id: number){
    return this.http.get(
      `${this.baseUrl}/users/${id}`
    );
  }

  updateUser(id: number, request: any) {
    return this.http.put(
      `${this.baseUrl}/users/${id}`,
      request
    );
  }

}