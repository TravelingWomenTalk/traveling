import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(
    public authService: AuthService,
    public toastService: ToastService,
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
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(6)]),
      displayName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    });
  }

  public create(): void {
    if (this.signupForm.getRawValue().password !== this.signupForm.getRawValue().password2) {
      this.toastService.show('Your passwords must match.', { classname: 'bg-danger text-light', delay: 4000 });
      return;
    }
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

  public get password2Control(): AbstractControl {
    return this.signupForm.get('password2');
  }

  public get displayNameControl(): AbstractControl {
    return this.signupForm.get('displayName');
  }

  public get genderControl(): AbstractControl {
    return this.signupForm.get('gender');
  }

}
