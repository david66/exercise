import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoxesService } from '../../services/boxes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  boxes: any [] = [];
  scores: any [] = [];
  score: number = 0;
  show: boolean = false;
  message: string = '';
  timeLeft: number = 60;
  interval;
  intervalTimer;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor ( private _boxesService:BoxesService ) {}

  ngOnInit() {
    //GET BOXES SERVICE
    this._boxesService.getBoxes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(boxes => this.boxes = boxes);
  }

  //START CLOCK COUNTER
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      } if (this.timeLeft === 0) {
        clearInterval(this.interval);
        clearInterval(this.intervalTimer);
        this.scores.push({'score':this.score,'current':true});
        this.topScore(this.score);
        this.show = true;
        this.score = 0;
        console.log(this.scores);
      }
    },1000)
  }

  //RANDOM BOXES
  playRandom () {
    this.boxes = this.boxes.sort( () => Math.random() - 0.5);
  }

  //CALCULATE SCORE
  operation (type) {
    if (type === 'right') {
      this.score = this.score - 5;
      return true;
    } else if (type === 'damaged') {
      this.score = this.score + 1;
      return false;
    }
  }

  topScore (score) {
    this.scores = this.scores.sort(this.compare);
  }

  compare (a,b) {
    if (a.score < b.score)
      return -1;
    if (a.score > b.score)
      return 1;
    return 0;
  }

  //START GAME
  startPlay () {
    this.timeLeft = 60;
    this.show = false;
    this.message = '';
    for (let entry of this.scores) {
      entry.current = false;
    }
    this.intervalTimer = setInterval(() => {
        this.boxes = this.boxes.sort( () => Math.random() - 0.5);
        this.score = this.score - 1;
      },5000);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
