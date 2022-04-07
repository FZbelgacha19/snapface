import { FaceSnap } from './../models/face-snap.model';
import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {
  @Input() FaceSnap!: FaceSnap;

  buttonText!: string;

  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
  }

  onSnap(){
    if (this.buttonText === 'Oh Snap!') {
      this.buttonText = 'Oops, unSnap!';
      this.FaceSnap.snaps++;
    } else {
      this.buttonText = 'Oh Snap!';
      this.FaceSnap.snaps--;
      
    }
  }
}
