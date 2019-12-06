import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
    private titleService: Title) {
    this.titleService.setTitle('Travelng Women Talk | Sign up');
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public create(): void {
    if (this.signupForm.valid) {
      this.authService.emailCreate(this.signupForm.getRawValue().email, this.signupForm.getRawValue().password);
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
