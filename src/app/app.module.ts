import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { AddAnnonceComponent } from './add-annonce/add-annonce.component';
import {FormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UserpageComponent } from './userpage/userpage.component';
import { ViewAnnoncesComponent } from './view-annonces/view-annonces.component';
import { ConceptionComponent } from './conception/conception.component';
import { ManageAnnoncesComponent } from './manage-annonces/manage-annonces.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeUtilisateursComponent,
    AccueilComponent,
    AddAnnonceComponent,
    SignupComponent,
    UserpageComponent,
    ViewAnnoncesComponent,
    ConceptionComponent,
    ManageAnnoncesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
