import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {CookieService} from 'ngx-cookie-service';

// Interface correspondant à la réponse d'identification au cookie
interface UserIdentificationResponse {
  idUser: string;
}

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  providers: [ CookieService ],
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  idUser = '';
  connectStatus = false;
  quartier = '';
  arrondissement = 0;
  numInteret = 0;
  description = '';
  titre = '';
  scale = '';
  status = 0;
  interests = []; // Sera rempli à l'initialisation de la classe
  nominteret = "interet";

  constructor(private httpClient: HttpClient, private router: Router, private location: Location, private cookieService: CookieService) {
  }

  ngOnInit() {

    // Vérification de l'existence ou non d'un cookie
    if (this.cookieService.check('givinsa_id')) {
      // Vérification de la validité du cookie actuel
      this.httpClient.get<UserIdentificationResponse>
      ('http://127.0.0.1:5002/whois/' + this.cookieService.get('givinsa_id')).subscribe(data => {
        if (data.idUser === '') {
          // Cookie invalide (possible si il y a eu une connexion ailleurs) : suppression.
          this.cookieService.delete('givinsa_id');
        } else {
          // Cookie valide : on connait l'utilisateur
          this.connectStatus = true;
          this.idUser = data.idUser;
        }
        // La suite ne doit se faire que si l'utilisateur est identifié.
        if (this.connectStatus === true) {
          this.httpClient.get('http://127.0.0.1:5002/interests', this.httpOptions).subscribe(res => {
            this.interests = res as [JSON];
          });
        }
      });
    }
  }
  interetSelect(int, nom) {
    this.numInteret = int;
    this.nominteret = nom;
  }

  post() {
    const data = {
      idInteret: this.numInteret,
      description: this.description,
      title: this.titre,
      scale: this.scale
    };
    this.status = 1;
    // @ts-ignore
    this.httpClient.post('http://127.0.0.1:5002/annonces/' + this.idUser, data, this.httpOptions).subscribe(res => {
      if (res === true) { location.reload(); } else {this.status = 2; }
    });
  }
}


