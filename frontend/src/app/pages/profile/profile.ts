import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {

  user = {
    name: 'Lilly',
    role: 'donor',
    phone: '9876543210',
    address: ''
  }
  constructor(private router: Router) {}

  name = this.user.name
  address = ''

  completed = 0
  meals = 0
  badges = 1

  save() {
    alert('Profile saved')
  }

  logout() {
    alert('Logout');
    this.router.navigate(['']);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}