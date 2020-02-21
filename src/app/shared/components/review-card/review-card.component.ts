import { Component, Input } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { Review } from 'src/app/shared/models/review.model';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {

  @Input()
  public review: Review;
  @Input()
  public readMore: boolean;

  constructor(
    public toastService: ToastService,
    private reviewService: ReviewService,
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService
  ) { }

  public navigateDetails(review: Review): void {
    this.router.navigate(['review', review.id]);
  }

  public shareReview(review: Review): void {
    const url: string = `https://www.facebook.com/sharer/sharer.php?u=https://travelingwomentalk.com/review/${review.id}/`;
    window.open(url, '_blank');
    this.toastService.show(`Shared ${review.location} review!`, { classname: 'bg-success text-light', delay: 4000 });
  }

  public editReview(review: Review): void {
    this.authService.user$.subscribe((user) => {
      if (user.uid === review.user.uid) {
        this.router.navigate(['review', review.id, 'edit']);
      } else {
        this.toastService.show('You cannot edit a review you did not write.', { classname: 'bg-danger text-light', delay: 4000 });
      }
    });
  }

  public deleteReview(review: Review): void {
    this.authService.user$.subscribe((user) => {
      if (user.uid === review.user.uid) {
        this.reviewService.delete(review.id);
      } else {
        this.toastService.show('You cannot delete a review that isn\'t yours.', { classname: 'bg-danger text-light', delay: 4000 });
      }
    });
  }

  public confirmDelete(content: any, review: Review): void {
    this.modalService.open(content, {ariaLabelledBy: 'delete-confirm-modal', keyboard: true }).result.then((result) => {
      if (result === 'delete') {
        this.deleteReview(review);
      }
    }, () => {
      return;
    });
  }
}
