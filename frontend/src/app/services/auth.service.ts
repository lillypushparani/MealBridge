import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  checkUser(phone: string) {
    return this.http.post(
      `${environment.apiUrl}/auth/check-user`,
      { phone }
    )
  }

  registerUser(data: any) {
    return this.http.post(
      `${environment.apiUrl}/auth/register`,
      data
    );
  }

}