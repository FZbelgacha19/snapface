import { SingleFaceSnapComponent } from './single-face-snap/single-face-snap.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {NewFaceSnapComponent} from "./new-face-snap/new-face-snap.component";

const routes: Routes = [
    {path: '', component:LandingPageComponent},
    {path: 'facesnap', component: FaceSnapListComponent},
    {path: 'facesnap/:id', component: SingleFaceSnapComponent},
    {path: "create", component: NewFaceSnapComponent}
]


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
