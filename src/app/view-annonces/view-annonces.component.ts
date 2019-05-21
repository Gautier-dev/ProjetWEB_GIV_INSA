import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Location} from '@angular/common';


// Interface correspondant à la réponse d'identification au cookie
interface UserIdentificationResponse {
  idUser: string;
}

@Component({
  selector: 'app-view-annonces',
  templateUrl: './view-annonces.component.html',
  styleUrls: ['./view-annonces.component.css']
})
export class ViewAnnoncesComponent implements OnInit {

  // Paramètres de visionnage :
  idQuartier: string;
  arrondissement: 3;

  interet: number; // Valeur à 0 : "peu importe"
  interets: [JSON];
  nominteret: 'type';
  annonces: [JSON];
  idAnnonce: 0;
  UserAnonce: string;
  idInteret: number;
  description: string;
  titre: string;
  echelle: number;
  etat: number;
  idUser: string;
  connectStatus: boolean;
  searchOK = false;
  bouton = false;

  constructor(private httpClient: HttpClient, private router: Router, private location: Location, private cookieService: CookieService) { }

  search() {
    this.httpClient.get('http://127.0.0.1:5002/annonces/' + this.nominteret + '/' + this.idQuartier).subscribe(data => {
      this.annonces = data as [JSON];
    });
    this.searchOK = true;
  }

  annonce(annonce) {
    this.idAnnonce = annonce.idAnnonce;
    this.UserAnonce = annonce.idUser;
    this.idInteret = annonce.idInteret;
    this.description = annonce.description;
    this.titre = annonce.titre;
    this.echelle = annonce.echelle;
    this.etat = annonce.etat;
    this.bouton = true;


  }
  interetSelect(int, nom) {
    this.interet = int;
    this.nominteret = nom;
  }



  ngOnInit() {
    if (this.cookieService.check('givinsa_id')) {
      // Vérification de la validité du cookie actuel
      this.httpClient.get<UserIdentificationResponse>
      ('http://127.0.0.1:5002/whois/' + this.cookieService.get('givinsa_id')).subscribe(data => {
        // Affichage :
        console.log(data);
        console.log(data.idUser);
        if (data.idUser === '') {
          // Cookie invalide (possible si il y a eu une connexion ailleurs) : suppression.
          this.cookieService.delete('givinsa_id');
        } else {
          // Cookie valide : l'utilisateur est bien identifié
          this.connectStatus = true;
          this.idUser = data.idUser;
          this.interet = 0;
          this.httpClient.get('http://127.0.0.1:5002/quartier/' + this.idUser).subscribe(data2 => {
            this.idQuartier = data2.idQuartier as string;
            this.httpClient.get('http://127.0.0.1:5002/interests').subscribe(data => {
              this.interets = data as [JSON];
            });
          });
        }
      });
    }
  }


}
