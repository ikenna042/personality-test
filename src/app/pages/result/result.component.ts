import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Result } from 'src/app/model';
import { StoreService } from 'src/app/state/store.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  storeSub: Subscription;
  result: Result | any;

  constructor(private readonly storeService: StoreService,
              private readonly router: Router) {
    this.storeSub = this.storeService.stateChanged.subscribe(state => {
      if (state) {
        this.result = state.currentResult;
      }
    })
  }

  ngOnInit(): void {
  }

  
  startAgain() {
    this.storeService.reset();
    this.router.navigate(['home']);
  }

}
