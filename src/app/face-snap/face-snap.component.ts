import { Router } from '@angular/router';
import { FaceSnapService } from './../services/face-snaps.service';
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
  constructor(private faceSnapService: FaceSnapService, 
    private route: Router){}
  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
  }

  onSnap(){
    if (this.buttonText === 'Oh Snap!') {
      this.buttonText = 'Oops, unSnap!';
      this.faceSnapService.snapFaceSnapById(this.FaceSnap.id, 'snap');
    } else {
      this.buttonText = 'Oh Snap!';
      this.faceSnapService.snapFaceSnapById(this.FaceSnap.id, 'unsnap');
      
    }
  }

  onViewFaceSnap(){
    this.route.navigateByUrl(`facesnap/${this.FaceSnap.id}`);
  }
}
