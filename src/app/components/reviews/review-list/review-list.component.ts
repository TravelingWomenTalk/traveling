import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { map } from 'rxjs/operators';
import { Review } from 'src/app/shared/models/review.model';
import { Title } from '@angular/platform-browser';
//import { Observable } from 'rxjs/Observable';
//import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  host: {
    //'(window:scroll)' : 'onScroll($event)'
  }
})
export class ReviewListComponent implements OnInit {

  public reviews: Review[];
  public searchValue: string = "";

  constructor(
    private reviewService: ReviewService,
    private titleService: Title) {
    this.titleService.setTitle('Travelng Women Talk | Reviews');
  }

  public ngOnInit(): void {
    //this.getAllReviews();
  }

  public getAllReviews(): void {
    this.reviewService.getAll().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Review;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });
  }

  public search(): void {
    if (this.searchValue.length === 0) {
      this.getAllReviews();
      return;
    }

    this.reviewService.search(this.searchValue).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Review;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });;
  }

  scrollHandler(e) {
    console.log(e)
    // should log top or bottom
  }
}
