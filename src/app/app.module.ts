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
import { AfficherAnnonceComponent} from './afficher-annonce/afficher-annonce.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { ConceptionComponent } from './conception/conception.component';
import { ManageAnnoncesComponent } from './manage-annonces/manage-annonces.component';
import { CompteGestionComponent } from './compte-gestion/compte-gestion.component';
import {CookieService} from 'ngx-cookie-service';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';




@NgModule({
  declarations: [
    AppComponent,
    ListeUtilisateursComponent,
    AccueilComponent,
    AddAnnonceComponent,
    SignupComponent,
    UserpageComponent,
    ViewAnnoncesComponent,
    AfficherAnnonceComponent,
    ConceptionComponent,
    ManageAnnoncesComponent,
    CompteGestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
