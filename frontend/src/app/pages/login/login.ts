import { Component, ViewChildren, QueryList, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

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

  constructor(
    private router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {}

  step: AuthStep = 'phone';

  phone = '';
  role = 'donor';

  name = '';
  organizationName = '';
  contactPerson = '';
  address = '';

  isDetectingLocation = false;
  resendTimer = 0;

  userId = 0;

  isExistingUser = false;
  loggedUser: any = null;

  otp = ['', '', '', '', '', ''];



  /* ==============================
        PHONE CHECK
  ============================== */

handlePhoneSubmit() {

if (this.phone.length !== 10) {
alert('Enter valid phone');
return;
}

this.step = 'checking';

this.auth.checkUser(this.phone)
.subscribe((res: any) => {

if (res > 0) {

this.userId = res;
this.isExistingUser = true;
this.step = 'otp';

} 
else {

this.isExistingUser = false;
this.step = 'register';

}

this.cdr.detectChanges();

},
(error) => {

console.error(error);
alert("Something went wrong");
this.step = 'phone';

});

}



  /* ==============================
        REGISTER USER
  ============================== */

handleRegisterSubmit() {

let payload:any = {}

if (this.role === 'donor') {

if (!this.name) {
alert('Enter name');
return;
}

payload = {
name: this.name,
phone: this.phone,
role: 'DONOR'
}

} 
else {

payload = {
name: this.organizationName,
phone: this.phone,
role: 'HOME',
address: this.address
}

}

this.auth.registerUser(payload)
.subscribe((res:any)=>{

this.loggedUser = res;
this.userId = res.id;

this.step = 'otp';
this.cdr.detectChanges();

})

}



  /* ==============================
        VERIFY OTP
  ============================== */

verifyOtp(){

const otpValue = this.otp.join('');

if (otpValue.length !== 6) {
alert('Please enter 6-digit OTP');
return;
}

/* If user just registered */

if(this.loggedUser){

localStorage.setItem(
"user",
JSON.stringify(this.loggedUser)
);

alert('Registration successful!');

this.router.navigate(['/dashboard']);
return;

}


/* Existing user */

this.userService.getUser(this.userId)
.subscribe((user:any)=>{

localStorage.setItem(
"user",
JSON.stringify(user)
);

alert('Login successful!');

this.router.navigate(['/dashboard']);

})

}



  /* ==============================
        OTP HANDLING
  ============================== */

handleOtpKeydown(index: number, event: KeyboardEvent) {

const key = event.key;

if (key === 'Backspace') {

event.preventDefault();

if (this.otp[index]) {
this.otp[index] = '';
} 
else if (index > 0) {
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



  /* ==============================
        LOCATION
  ============================== */

detectLocation() {

this.isDetectingLocation = true;

navigator.geolocation.getCurrentPosition(() => {

this.isDetectingLocation = false;

this.address = 'Location detected';

});

}

}