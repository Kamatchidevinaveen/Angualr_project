import { Component, OnInit } from '@angular/core';

import { of, forkJoin, timer, from } from 'rxjs';

import { CommonServiceService } from '../../../services/common-service.service';

@Component({
  selector: 'app-rxjs-fork-join',
  templateUrl: './rxjs-fork-join.component.html',
  styleUrls: ['./rxjs-fork-join.component.scss'],
})
export class RxjsForkJoinComponent implements OnInit {
  /** variable declarations */

  private details: any;

  public of_details_1: any;
  public of_details_2: any;
  public forkJoinDetails: any;

  /** constructor class */
  constructor(private commonService: CommonServiceService) {}

  /** private methods */

  private getDetails(): void {
    this.commonService.getDetails().subscribe((result) => {
      this.of_details_1 = from(result);
      this.populateConcatDetails();
    });
  }

  private getPostDetails(): void {
    this.commonService.getPostDetails().subscribe((result) => {
      this.of_details_2 = from(result);
      this.populateConcatDetails();
    });
  }

  private populateConcatDetails(): void {
    if (this.of_details_1 && this.of_details_2) {
      forkJoin([this.of_details_1, this.of_details_2]).subscribe((r) => {
        this.forkJoinDetails = r;
        console.log(this.forkJoinDetails);
      });
    }
  }

  /** public methods */

  ngOnInit(): void {
    const observable = forkJoin([
      of([1, 2, 3, 4]),
      Promise.resolve(8),
      timer(4000),
    ]);
    observable.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('This is how it ends!'),
    });
    this.getDetails();
    this.getPostDetails();
  }
}
