import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


type AuthStep = 'phone' | 'checking' | 'register' | 'otp';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})



export class LoginComponent {

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(private router: Router){}

  verifyOtp(){
    const otpValue = this.otp.join('');
    if (otpValue.length !== 6) {
      alert('Please enter 6-digit OTP');
      return;
    }

    // For demo, any 6-digit OTP works
    if (this.foundUser) {
      alert('Login successful!');
    } else {
      alert('Registration successful!');
    }
    this.router.navigate(['/dashboard']);
  }


  step: AuthStep = 'phone';

  phone = '';
  role = 'donor';

  name = '';
  organizationName = '';
  contactPerson = '';
  address = '';

  

  isDetectingLocation = false;
  resendTimer = 0;

  foundUser: any = null;

  handlePhoneSubmit() {

    if (this.phone.length !== 10) {
      alert('Enter valid phone');
      return;
    }

    this.step = 'checking';


      // later replace with API
      this.foundUser = null;

      if (this.foundUser) {
        this.step = 'otp';
      } else {
        this.step = 'register';
      }


  }

  handleRegisterSubmit() {

    if (this.role === 'donor' && !this.name) {
      alert('Enter name');
      return;
    }

    this.step = 'otp';

  }



otp = ['', '', '', '', '', ''];

handleOtpKeydown(index: number, event: KeyboardEvent) {
  const key = event.key;

  if (key === 'Backspace') {
    event.preventDefault();
    if (this.otp[index]) {
      this.otp[index] = '';
    } else if (index > 0) {
      this.otp[index - 1] = '';
      this.focusInput(index - 1);
    }
    return;
  }

  if (!/^\d$/.test(key)) {
    event.preventDefault();
    return;
  }

  event.preventDefault();
  this.otp[index] = key;
  this.focusInput(index + 1);

}

handleOtpPaste(event: ClipboardEvent) {
  event.preventDefault();
  const paste = event.clipboardData?.getData('text')?.trim();
  if (paste && /^\d{6}$/.test(paste)) {
    this.otp = paste.split('');
    setTimeout(() => this.verifyOtp(), 100);
  }
}

focusInput(index: number) {
  if (index >= 0 && index < 6) {
    this.otpInputs.toArray()[index].nativeElement.focus();
  }
}
  detectLocation() {

    this.isDetectingLocation = true;

    navigator.geolocation.getCurrentPosition(() => {

      this.isDetectingLocation = false;
      this.address = 'Location detected';

    });

  }

  private updateOtpInputs() {
    this.otpInputs.forEach((input, i) => {
      input.nativeElement.value = this.otp[i];
    });
  }
}