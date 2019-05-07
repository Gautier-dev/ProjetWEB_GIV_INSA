import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import { ListeUtilisateursComponent } from '../liste-utilisateurs/liste-utilisateurs.component';
import { AccueilComponent } from '../accueil/accueil.component';
import { AddAnnonceComponent } from "../add-annonce/add-annonce.component";
import { SignupComponent} from "../signup/signup.component";
import { UserpageComponent } from "../userpage/userpage.component"
import { ViewAnnoncesComponent } from '../view-annonces/view-annonces.component';


const routes: Routes = [
  {path: 'utilisateurs', component: ListeUtilisateursComponent},
  {path: '', component: AccueilComponent},
  {path: 'annonces/add', component: AddAnnonceComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'utilisateurs/:id', component: UserpageComponent},
  {path: 'annonces/view', component: ViewAnnoncesComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
