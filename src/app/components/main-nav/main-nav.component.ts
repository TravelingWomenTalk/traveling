import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  public isNavbarCollapsed: boolean = true;
  public user: any;

  constructor(
    public authService: AuthService,
    public router: Router) { }

  public ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

}
