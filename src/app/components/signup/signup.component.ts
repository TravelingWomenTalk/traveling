import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public auth: AuthService,
    public router: Router,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  create() {
    if (this.signupForm.valid) {
      this.auth.emailCreate(this.signupForm.getRawValue().email, this.signupForm.getRawValue().password);
  
      this.router.navigate(['/reviews']);
    }
  }

  public get emailControl(): AbstractControl {
    return this.signupForm.get('email');
  }

  public get passwordControl(): AbstractControl {
    return this.signupForm.get('password');
  }

}
