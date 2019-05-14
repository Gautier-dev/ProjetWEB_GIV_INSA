import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

// Interface correspondant à la réponse d'identification au cookie
interface UserIdentificationResponse {
  idUser: string;
}

// Interface correspondant à la réponse de la demande du lien entre les utilisateurs
interface UserContactResponse {
  relation: number;
  demandeur: string;
}

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  providers: [ CookieService ],
  styleUrls: ['./userpage.component.css']
})


export class UserpageComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  userData = [{}];
  connectStatus = false;
  idUser: string; // Identifiant de l'UTILISATEUR
  status: number; // 0 : Inconnu, 1 : ami, 2 : propriétaire
  friend: number;
  id: string; // Identifiant du PROPRIETAIRE DE LA PAGE
  responsableDemande: string; // Dans le cas d'une demande d'ami : celui qui a effectué la demande.

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService) { }

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
          this.id = this.route.snapshot.paramMap.get('id');
          console.log(this.id);
          // Cas 1 : l'utilisateur est le propriétaire de la page.
          // Vision : totale.
          // Possibilité de modifier des choses.
          // Possibilité de voir les demandes en ami et de les accepter / refuser.
          if (this.id === this.idUser) {
            this.httpClient.get('http://127.0.0.1:5002/utilisateur/' + this.id + '/1', this.httpOptions).subscribe(res => {
              this.userData = res as [JSON];
            });
            this.status = 2;
          } else {

            // Check de la relation.
            this.httpClient.get<UserContactResponse>(
              'http://127.0.0.1:5002/contact/' + this.id + '/' + this.idUser, this.httpOptions)
              .subscribe(res => {
              console.log(res);
              this.friend = res.relation;
              this.responsableDemande = res.demandeur;
              console.log(this.friend);


              // Cas 2 : l'utilisateur est ami avec le propriétaire de la page.
              // Vision : totale.
              // Possibilité de perdre ce lien d'amitié
              if (this.friend === 1) {
                this.httpClient.get('http://127.0.0.1:5002/utilisateur/' + this.id + '/1', this.httpOptions).subscribe(datas => {
                  this.userData = datas as [JSON];
                });
                this.status = 1;
              }

              // Cas 3 : l'utilisateur n'est pas ami
              // Vision : Quartier, arrondissement.
              // Possibilité de demander en ami.
              if ((this.friend === -1) || (this.friend === 2)) {
                this.httpClient.get('http://127.0.0.1:5002/utilisateur/' + this.id + '/0', this.httpOptions).subscribe(datas => {
                  this.userData = datas as [JSON];
                });
                this.status = 0;
              }

              // Cas 4 : l'utilisateur n'est pas ami mais a reçu une demande du propriétaire de la page.
              // Vision : Quartier, arrondissement.
              // Possibilité d'accepter la demande.
              if ((this.friend === 0) && (this.responsableDemande !== this.idUser)) {
                this.httpClient.get('http://127.0.0.1:5002/utilisateur/' + this.id + '/0', this.httpOptions).subscribe(datas => {
                  this.userData = datas as [JSON];
                });
                this.status = 0;
              }

              // Cas 5 : l'utilisateur n'est pas ami mais a envoyé une demande au propriétaire de la page.
              // Vision : Quartier, arrondissement.
              if ((this.friend === 0) && (this.responsableDemande === this.idUser)) {
                this.httpClient.get('http://127.0.0.1:5002/utilisateur/' + this.id + '/0', this.httpOptions).subscribe(datas => {
                  this.userData = datas as [JSON];
                });
                this.status = 0;
              }
            });
          }
        }
      });
      // Fin du ngOnInit
    }
  }

  // Fonctions :
  // Demande en ami
  friendAsk() {
    this.httpClient.post(
      'http://127.0.0.1:5002/contact/' + this.idUser + '/' + this.id,
      {relation: '0'}, this.httpOptions).subscribe(res => {
      if (res === true) { location.reload(); } else {console.log('Erreur lors de la demande.'); }
    });
  }
  // Acceptation d'amitié
  friendAccept() {
    this.httpClient.post(
      'http://127.0.0.1:5002/contact/' + this.idUser + '/' + this.id,
      {relation: '1'}, this.httpOptions).subscribe(res => {
      if (res === true) { location.reload(); } else {console.log('Erreur lors de la demande.'); }
    });
  }
  // Blocage d'amitié
  friendBlock() {
    this.httpClient.delete(
      'http://127.0.0.1:5002/contact/' + this.idUser + '/' + this.id,
      this.httpOptions).subscribe(res => {
      if (res === true) { location.reload(); } else {console.log('Erreur lors de la demande.'); }
    });
  }

  // Génération d'array
  generateArray(obj) {
    return Object.keys(obj).map((key) => obj[key] );
  }
}
