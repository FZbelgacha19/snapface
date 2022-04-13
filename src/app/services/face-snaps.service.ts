import {FaceSnap} from '../models/face-snap.model';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";


@Injectable({
  providedIn: "root"
})
export class FaceSnapService {
  faceSnaps: FaceSnap[] = [
    /*{
        id: 1,
        title: 'Archibald',
        description: 'Mon meilleur ami depuis tout petit !',
        imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
        createdDate: new Date(),
        snaps: 0
    },
    {
        id: 2,
        title: 'Three Rock Mountain',
        description: 'Un endroit magnifique pour les randonnées.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',
        createdDate: new Date(),
        snaps: 0
    },
    {
        id: 3,
        title: 'Un bon repas',
        description: 'Mmmh que c\'est bon !',
        imageUrl: 'https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg',
        createdDate: new Date(),
        snaps: 0
    }*/
  ];

  constructor(private http: HttpClient) {
  }

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    // return this.faceSnaps;
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }


  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    /*const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    if(faceSnap){
        return faceSnap;
    }else{
        throw new Error('FaceSnap not found');
    }*/
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    /*const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    if(faceSnap){
        snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
    }else{
        throw new Error('FaceSnap not found');
    }*/
    /* // this copilot code snippet
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => {
        snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
        return faceSnap;
      })
    ); */
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
      })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
    );
    /*
    Prenons un instant pour se demander si  switchMap  est le bon choix.

    L'Observable extérieur ici est une requête GET. Il va donc émettre une fois et compléter (ou émettre une erreur si le serveur retourne une erreur). On n'aura donc jamais la situation où l'Observable extérieur émet de nouveau alors qu'une souscription à l'Observable intérieur est en cours.

    On peut donc, dans ce cas, utiliser l'opérateur haut niveau que l'on veut !
     */
  }

  addfaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
    /*const newFaceSnap = {
      id: this.faceSnaps.length + 1,
      title: formValue.title,
      description: formValue.description,
      imageUrl: formValue.imageUrl,
      createdDate: new Date(),
      snaps: 0
    }
    this.faceSnaps.push(newFaceSnap);
  }*/
    /*return this.getAllFaceSnaps().pipe(
      map(faceSnaps => {
        const newFaceSnap = {
          id: faceSnaps.length + 1,
          title: formValue.title,
          description: formValue.description,
          imageUrl: formValue.imageUrl,
          createdDate: new Date(),
          snaps: 0
        }
        return newFaceSnap;
      }),
      switchMap(newFaceSnap => this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFaceSnap))
    );*/

    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a, b) => a.id - b.id)),
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
      map(previousFacesnap => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFacesnap.id + 1
      })),
      switchMap(newFacesnap => this.http.post<FaceSnap>(
        'http://localhost:3000/facesnaps',
        newFacesnap)
      )
    );
    /* Explication de ce code :
    Il est tout à fait possible d'effectuer ces trois étapes dans un seul opérateur. Je voulais simplement vous montrer la lisibilité qui peut être gagnée en séparant les étapes :

    On retourne un tableau trié par ID pour s'assurer que le dernier élément du tableau possède l'ID le plus élevé.

    On retourne ensuite le dernier élément de ce tableau.

    On retourne le nouveau FaceSnap avec son ID valable.

     */
  }


}
