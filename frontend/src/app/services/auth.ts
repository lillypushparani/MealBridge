import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  checkUser(phone: string) {
    return this.http.post(`${this.baseUrl}/auth/check-user`, {
      phone
    });
  }

}