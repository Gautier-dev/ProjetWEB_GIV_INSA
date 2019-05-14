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
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  providers: [ CookieService ],
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  connectStatus = false;
  idUser: string;

  constructor(private httpClient: HttpClient, private router: Router, private location: Location, private cookieService: CookieService) { }

  ngOnInit() {
    // Vérification de l'existence ou non d'un cookie
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
        }
      });
    }
  }
}
