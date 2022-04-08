import { FaceSnap } from './../models/face-snap.model';
import { FaceSnapService } from './../services/face-snaps.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
 FaceSnap!: FaceSnap;

  buttonText!: string;
  constructor(private faceSnapService: FaceSnapService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
    const snapId = +this.route.snapshot.params['id'];
    this.FaceSnap = this.faceSnapService.getFaceSnapById(snapId);
  }

  onSnap() {
    if (this.buttonText === 'Oh Snap!') {
      this.buttonText = 'Oops, unSnap!';
      this.faceSnapService.snapFaceSnapById(this.FaceSnap.id, 'snap');
    } else {
      this.buttonText = 'Oh Snap!';
      this.faceSnapService.snapFaceSnapById(this.FaceSnap.id, 'unsnap');

    }
  }
}
