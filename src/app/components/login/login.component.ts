import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public resetForm: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private titleService: Title) {
    this.titleService.setTitle('Travelng Women Talk | Login');
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public buildResetForm(): void {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public resetPassword(content: any): void {
    this.buildResetForm();
    this.modalService.open(content, { ariaLabelledBy: 'reset-password-modal', keyboard: true }).result.then((result) => {
      if (result === 'save') {
        this.authService.resetPassword(this.resetForm.getRawValue().email);
      }
    }, () => {
      return;
    });
  }

  public login(): void {
    this.authService.emailLogin(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password);
  }

  public get emailControl(): AbstractControl {
    return this.loginForm.get('email');
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.get('password');
  }

  public get passwordResetControl(): AbstractControl {
    return this.resetForm.get('email');
  }

}
