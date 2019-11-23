import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private titleService: Title) {
    this.titleService.setTitle('Travelng Women Talk | Profile');
  }

  public ngOnInit() { }

}
