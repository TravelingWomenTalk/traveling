import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewListComponent } from './components/reviews/review-list/review-list.component';
import { ReviewFormComponent } from './components/reviews/review-form/review-form.component';
import { ReviewDetailComponent } from './components/reviews/review-detail/review-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'reviews', pathMatch: 'full' },
  { path: 'reviews', component: ReviewListComponent },
  { path: 'review/:id', component: ReviewDetailComponent },
  { path: 'review/:id/edit', component: ReviewFormComponent },
  { path: 'create', component: ReviewFormComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  NotFoundComponent,
  ReviewFormComponent,
  ReviewListComponent,
  ReviewDetailComponent,
  UserProfileComponent,
  LoginComponent,
  SignupComponent,
  AboutComponent
];
