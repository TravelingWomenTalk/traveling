import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { Review } from 'src/app/shared/models/review.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public id: string;
  public user: User;
  public reviews: Review[];

  constructor(
    public authService: AuthService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private titleService: Title) { }

  public ngOnInit(): void {
    this.titleService.setTitle('Travelng Women Talk | Profile');
    this.getUserData();
  }

  public getUserData(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.id = params['id'];
        return this.authService.getUserByUserId(params['id']).valueChanges();
      }),
      switchMap((user: User) => {
        this.user = user;
        return this.reviewService.getByUserId(user.uid).valueChanges();
      })
    ).subscribe((reviews: Review[]) => {
        this.reviews = reviews;
    });
  }

}
