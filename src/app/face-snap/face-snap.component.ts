import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {

  title!: string;
  description!: string;
  createdDate!: Date;
  snaps!: number;
  imageUrl!: string;
  buttonText!: string;

  ngOnInit(): void {
    this.title = 'Archibald';
    this.description = 'Mon meilleur ami depui toutes les années';
    this.createdDate = new Date();
    this.snaps = 6;
    this.imageUrl = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60';
    this.buttonText = 'Oh Snap!';
  }

  onSnap(){
    if (this.buttonText === 'Oh Snap!') {
      this.buttonText = 'Oops, unSnap!';
      this.snaps++;
    } else {
      this.buttonText = 'Oh Snap!';
      this.snaps--;
      
    }
  }
}
