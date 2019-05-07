import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import { ListeUtilisateursComponent } from '../liste-utilisateurs/liste-utilisateurs.component';
import { AccueilComponent } from '../accueil/accueil.component';
import { AddAnnonceComponent } from "../add-annonce/add-annonce.component";
import { SignupComponent} from "../signup/signup.component";


const routes: Routes = [
  {path: 'utilisateurs', component: ListeUtilisateursComponent},
  {path: '', component: AccueilComponent},
  {path: 'annonces/add', component: AddAnnonceComponent},
  {path: 'signup', component: SignupComponent}
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
