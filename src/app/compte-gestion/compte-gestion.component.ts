import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

// Interface correspondant à la réponse d'identification au cookie
interface UserIdentificationResponse {
  idUser: string;
}

@Component({
  selector: 'app-compte-gestion',
  templateUrl: './compte-gestion.component.html',
  providers: [ CookieService ],
  styleUrls: ['./compte-gestion.component.css']
})
export class CompteGestionComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  connectStatus = false;
  idUser: string;

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService,
              private location: Location) {}

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
      });
    }
  }

  disconnect() {
    this.httpClient.delete('http://127.0.0.1:5002/goodbye/' + this.cookieService.get('givinsa_id'), this.httpOptions)
      .subscribe(res => {
        if (res === true) {
          this.cookieService.delete('givinsa_id');
          location.reload(); }
      });
  }

}
