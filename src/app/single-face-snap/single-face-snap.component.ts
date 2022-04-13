import {FaceSnap} from '../models/face-snap.model';
import {FaceSnapService} from '../services/face-snaps.service';
import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  FaceSnap!: FaceSnap;
  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;

  constructor(private faceSnapService: FaceSnapService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
    const snapId = +this.route.snapshot.params['id'];
    //this.FaceSnap = this.faceSnapService.getFaceSnapById(snapId);
    this.faceSnap$ = this.faceSnapService.getFaceSnapById(snapId);
  }

  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
      /*this.buttonText = 'Oops, unSnap!';
      this.faceSnapService.snapFaceSnapById(faceSnapId, 'snap');*/
      this.faceSnap$ = this.faceSnapService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() => this.buttonText = 'Oops, unSnap!')
      );
    } else {
      this.faceSnap$ = this.faceSnapService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => this.buttonText = 'Oh Snap!')
      );
      /*this.buttonText = 'Oh Snap!';
      this.faceSnapService.snapFaceSnapById(faceSnapId, 'unsnap');*/

    }
    /*
    Vous constaterez peut-être un "flash" au moment du renouvellement du FaceSnap. Ce comportement est lié à l'implémentation un peu artificielle utilisée ici comme cas pratique, car vous réinitialisez l'Observable du component à chaque snap.

    Dans des applications Angular complètes, on aura tendance à implémenter un système de state management (gestion d'état) qui permet d'éviter ce genre de problème. Ces systèmes peuvent être très complexes, mais à la fin vous aurez quand même un Observable à traiter : ce que vous apprenez ici vous sera donc très utile pour toutes les implémentations habituelles de state management (NgRx, NGXS…).
         */
  }
}
