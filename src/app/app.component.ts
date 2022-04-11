
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
  }

}





/*import { Component, OnInit } from '@angular/core';
import { interval, tap, Observable, map, take, mergeMap, delay, of, concatMap, exhaustMap, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages$! : Observable<string>;

  ngOnInit() {
    //message$ émet les strings 'first', 'second', 'third' à une seconde de temps
    this.messages$ = interval(1000).pipe(
      take(3),
      tap(message => console.log(`${this.getMessage(message)}`)),
      mergeMap(message => this.processMessage$(message)),
      tap(message => console.log(`${message} processed`)),

      // delay(1000)
  );
  this.messages$.subscribe();

  }

  processMessage$(message: number){
    //console.log(`${this.getMessage(message)} processed`);
    return of(this.getMessage(message)).pipe(delay(3000));
  }
  getMessage(message: number){
    switch (message) {
      case 0:
        return 'first';
      case 1:
        return 'second';
      case 2:
        return 'third';
      default:
        return 'unknown';
    }
  }
}*/


// les opérateur haut niveau
/* import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { concatMap, mergeMap, delay, exhaustMap, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  redTrainsCalled = 0;
  yellowTrainsCalled = 0;
// *
//   Si vous ouvrez la console, vous verrez une simulation de l'exemple des trains rouges et jaunes.
//   La lumière change de couleur toutes les 500 ms, et change 10 fois en tout.
//   Un train rouge met 5 secondes pour arriver, et un train jaune met 6 secondes.

  ngOnInit() {
    interval(500).pipe(
      take(10),
      map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
      tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
      mergeMap(color => this.getTrainObservable$(color)),
      tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`))
    ).subscribe();
  }

  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
    return of({ color, trainIndex }).pipe(
      delay(isRedTrain ? 5000 : 6000)
    );
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow';
  }
}
 */

// opérateur bas niveau
/* import { Component, OnInit } from '@angular/core';
import { filter, interval, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // interval$!: Observable<number>;
  interval$!: Observable<string>;

  ngOnInit(): void {
    this.interval$ = interval(1000).pipe(
      //map(value => value*10)
      filter(value => value % 3 === 0),
      map(value => value % 2 === 0 ?
        `Je suis ${value} et je suis pair` :
        `Je suis ${value} et je suis impair`
    ),
        tap(text => this.logger(text))
    );
  }

  logger(text: string){
    console.log(`log : ${text}`);
  }
}
 */
