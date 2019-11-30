import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  public isNavbarCollapsed = true;

  constructor(
    public authService: AuthService,
    public router: Router) { }

  public navigateProfile() {
    this.authService.user$.subscribe((user) => {
      this.router.navigate(['profile', user.uid]);
    });
  }

}
