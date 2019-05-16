import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// Interface correspondant à la réponse d'identification au cookie
interface UserIdentificationResponse {
  idUser: string;
}

@Component({
  selector: 'app-manage-annonces',
  templateUrl: './manage-annonces.component.html',
  providers: [ CookieService ],
  styleUrls: ['./manage-annonces.component.css']
})
export class ManageAnnoncesComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private connectStatus = false;
  private idUser: string;
  private annonces: [JSON];

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

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
        if (this.connectStatus) {
          this.httpClient.get('http://127.0.0.1:5002/annonces/' + this.idUser, this.httpOptions).subscribe(res => {
            this.annonces = res as [JSON];
          });
        }
      });
    }
  }

  // Fonction d'interaction avec les annonces :
  // Passage de l'annonce en "don en cours"
  setAsked(idAnnonce) {
    this.httpClient.put('http://127.0.0.1:5002/annonces/' + idAnnonce, {etat: 0}, this.httpOptions)
      .subscribe(res => {
        if (res === true) { location.reload(); }
      });
  }

  // Passage de l'annonce en "libre"
  setFree(idAnnonce) {
    this.httpClient.put('http://127.0.0.1:5002/annonces/' + idAnnonce, {etat: 1}, this.httpOptions)
      .subscribe(res => {
        if (res === true) { location.reload(); }
      });
  }

  // Suppression de l'annonce
  deleteAnnonce(idAnnonce) {
    this.httpClient.delete('http://127.0.0.1:5002/annonces/' + idAnnonce, this.httpOptions)
      .subscribe(res => {
        if (res === true) { location.reload(); }
      });
  }
}
