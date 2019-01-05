import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResultComponent implements OnInit {

  isSuccessfull: boolean;
  planet;
  timeTaken;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.isSuccessfull = params.success;
        if (this.isSuccessfull) {
          this.planet = params.planet;
          this.timeTaken = params.timeTaken
        }
      });
  }

}
