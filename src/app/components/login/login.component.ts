import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public auth: AuthService,
    public router: Router,
    public fb: FormBuilder,
    private titleService: Title) {
    this.titleService.setTitle('Travelng Women Talk | Login');
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  login(email: string, password: string) {
    this.auth.emailLogin(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password);

    this.router.navigate(['/reviews']);
  }

}
