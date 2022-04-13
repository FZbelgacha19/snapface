import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
/*
cette classe permet d'ajouter (ou enregistrer) des intercepteurs dans le service http
 */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
/*
L'utilisation de  HTTP_INTERCEPTORS  dit à Angular qu'il s'agit ici d'un intercepteur HTTP. Vous y attribuez la classe AuthInterceptor que vous venez de créer. La clé multi  prévient que vous allez certainement ajouter plusieurs intercepteurs à la clé HTTP_INTERCEPTORS
*/
/*
Un provider est un objet que l'on déclare à Angular pour qu'il puisse l'injecter à différentes endroits de l'application.

D'ailleurs, même si vos services ne figurent pas ici, ce sont des providers également ! Ils sont déclarés avec  @Injectable()  et Angular peut ensuite les injecter là où vous en avez besoin, comme via le constructor de vos components, par exemple.
 */
