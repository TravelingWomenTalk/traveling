import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { Review } from 'src/app/shared/models/review.model';
import { User } from 'src/app/shared/models/user.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public id: string;
  public user: User;
  public reviews: Review[];
  public userForm: FormGroup;

  constructor(
    public authService: AuthService,
    private reviewService: ReviewService,
    private modalService: NgbModal,
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
        return this.reviewService.getByUserId(user.uid).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Review;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
      })
    ).subscribe((reviews: Review[]) => {
        this.reviews = reviews;
    });
  }

  public editUser(content: NgbModalRef<any>): void {
    this.buildForm();
    this.modalService.open(content, {ariaLabelledBy: 'delete-confirm-modal', keyboard: true }).result.then((result) => {
      if (result === 'save') {
        this.authService.update(this.id, this.userForm.getRawValue());
        this.authService.updateReviewUserData(this.reviews);
      }
    }, () => {
      return;
    });
  }

  public buildForm(): void {
    this.userForm = new FormGroup({
      email: new FormControl(this.user.email || ''),
      displayName: new FormControl(this.user.displayName, [Validators.required]),
      gender: new FormControl(this.user.gender || '', [Validators.required]),
      age: new FormControl(this.user.age || '', [Validators.required]),
      status: new FormControl(this.user.status || '', [Validators.required]),
      accomplice: new FormControl(this.user.accomplice || '', [Validators.required]),
      interest: new FormControl(this.user.interest || '', [Validators.required]),
      destination: new FormControl(this.user.destination || '', [Validators.required])
    });
  }

  public get displayNameControl(): AbstractControl {
    return this.userForm.get('displayName');
  }

  public get genderControl(): AbstractControl {
    return this.userForm.get('gender');
  }

  public get ageControl(): AbstractControl {
    return this.userForm.get('age');
  }

  public get statusControl(): AbstractControl {
    return this.userForm.get('status');
  }

  public get accompliceControl(): AbstractControl {
    return this.userForm.get('accomplice');
  }

  public get interestControl(): AbstractControl {
    return this.userForm.get('interest');
  }

  public get destinationControl(): AbstractControl {
    return this.userForm.get('destination');
  }

}
