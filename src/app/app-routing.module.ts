import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewListComponent } from './reviews/review-list/review-list.component';
import { ReviewFormComponent } from './reviews/review-form/review-form.component';
import { ReviewDetailComponent } from './reviews/review-detail/review-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'reviews', pathMatch: 'full' },
  { path: 'reviews', component: ReviewListComponent },
  { path: 'review/:id', component: ReviewDetailComponent },
  { path: 'review/:id/edit', component: ReviewFormComponent },
  { path: 'create', component: ReviewFormComponent}, //, canActivate: [AuthGuard] },
  { path: 'about', component: ReviewFormComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ReviewFormComponent, ReviewListComponent, ReviewDetailComponent, UserProfileComponent, LoginComponent, SignupComponent];