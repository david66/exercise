import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class BoxesService {

  boxes: any = [
    {
      type: 'right',
      src: 'assets/box_right.png',
    },
    {
      type: 'damaged',
      src: 'assets/box_damaged.png',
    },
    {
      type: 'right',
      src: 'assets/box_right.png',
    }
  ];

  constructor() { }

  //GET BOXES
  getBoxes(): Observable<any[]> {
    return Observable.of(this.boxes);
  }
}
