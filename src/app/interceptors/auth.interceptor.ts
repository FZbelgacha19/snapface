import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
/*
un intercerpteur est un objet qui intercepte les requêtes http
intercepte les requêtes c'est à dire qu'il va modifier les requêtes avant qu'elles ne soient envoyées au serveur
comment l'intercepteur modifie les requêtes ?
*/
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // on crée une nouvelle requête avec les headers
    const authToken = this.authService.getToken();
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken // bearer est un mot clé qui permet de définir le type de token
      })
    });
    // on retourne la nouvelle requête
    return next.handle(authReq);
  }
 /*
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.authService.getToken()}`);
    const modifiedReq = req.clone({ headers });
    return next.handle(modifiedReq);
  }*/
  /*
  on'a créer des  headers  utilisables par Angular avec  new HttpHeaders() et on utilise leur méthode  append()  pour y ajouter un header  Authorization  qui contient  Bearer TOKEN   – c'est souvent la forme requise pour ce type de header ;

on'a créer une nouvelle requête en clonant la précédente et en y ajoutant les  headers  que on vient de créer – les requêtes sont des objets immuables (qu'on ne peut pas modifier), donc on créera toujours une nouvelle requête qui contient les modifications requises ;

on retourne  next.handle()  en y passant la nouvelle requête – c'est ce qui permet à la requête de continuer son chemin.
   */
}
