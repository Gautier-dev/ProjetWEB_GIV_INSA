import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

// Interface correspondant à la réponse en cas de connexion
interface UserConnectionResponse {
  success: boolean;
  cookieValue: string;
}

// Interface correspondant à la réponse d'identification au cookie
interface UserIdentificationResponse {
  idUser: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [ CookieService ],
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {


  quartiers = []; // Sera rempli à l'initialisation de la classe
  quartier = 'Veuillez choisir votre quartier !';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  registerStatus = false;
  connectStatus = false;
  idUser: string;

  constructor(private httpClient: HttpClient, private router: Router, private location: Location, private cookieService: CookieService) {}

  ngOnInit() {

    // Vérification de l'existence ou non d'un cookie
    if (this.cookieService.check('givinsa_id')) {
      // Vérification de la validité du cookie actuel
      this.httpClient.get<UserIdentificationResponse>
      ('http://127.0.0.1:5002/whois/' + this.cookieService.get('givinsa_id')).subscribe(data => {
        // Affichage :
        if (data.idUser === '') {
          // Cookie invalide (possible si il y a eu une connexion ailleurs) : suppression.
          this.cookieService.delete('givinsa_id');
        } else {
          // Cookie valide : pas besoin de redemander une identification
          this.connectStatus = true;
          this.idUser = data.idUser;
        }
        // On cherche la liste des quartiers uniquement si c'est nécessaire.
        if (this.connectStatus === false) {
          this.httpClient.get('http://127.0.0.1:5002/quartiers').subscribe(resultat => {
            this.quartiers = resultat as [JSON];
          });
        }
      });
    }
  }


  connect() {
    // Recupere le textes des champs
    const pseudo = (document.getElementById('pseudo1') as HTMLInputElement).value;
    const psw = (document.getElementById('psw1') as HTMLInputElement).value;
    const data = {
      idUser: pseudo,
      password: psw
    };
    this.httpClient.post<UserConnectionResponse>('http://127.0.0.1:5002/login', data, this.httpOptions).subscribe(res => {
      this.connectStatus = res.success;
      switch (this.connectStatus) {
        case true: {
          (document.getElementById('pseudo') as HTMLInputElement).value = 'Connexion réussie';
          // Mise en place du cookie (son absence a été vérifiée à l'initialisation de la page)
          this.cookieService.set('givinsa_id', res.cookieValue, 7);
          // Affichage de l'identifiant
          this.httpClient.get<UserIdentificationResponse>
          ('http://127.0.0.1:5002/whois/' + this.cookieService.get('givinsa_id'))
            .subscribe(content => {this.idUser = content.idUser;
            });
          break;
        }

        case false: {
          (document.getElementById('pseudo') as HTMLInputElement).value = 'Je n\'ai pas réussi à te connecter je suis désolé(e) :(';
          break;
        }
      }
    });
  }

  cancel() {
    // Supprime l'eventuelle erreur de mdp
    (document.getElementById('pswerror') as HTMLInputElement).innerHTML = '';
  }
  submit() {
    // Supprime l'eventuelle erreur de mdp
    (document.getElementById('pswerror') as HTMLInputElement).innerHTML = '';
    // Recupere le textes des champs
    const pseudo = (document.getElementById('pseudo') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const psw = (document.getElementById('psw') as HTMLInputElement).value;
    const pswrepeat = (document.getElementById('psw-repeat') as HTMLInputElement).value;
    if (psw !== pswrepeat) {
      // Affiche une erreur si les champs de mdp ne correspondent pas
      (document.getElementById('pswerror') as HTMLInputElement).innerHTML = 'Les mots de passe ne matchent pas !';
      // Efface les champs de mdp
      (document.getElementById('psw') as HTMLInputElement).value = '';
      (document.getElementById('psw-repeat') as HTMLInputElement).value = '';
    }
    const data = {
      idUser: pseudo,
      mail: email,
      password: psw,
      idQuartier: this.quartier,
    };
    this.httpClient.post('http://127.0.0.1:5002/signup', data, this.httpOptions).subscribe(res => {
      this.registerStatus = res as boolean;
      switch (this.registerStatus) {
        case true: {
          (document.getElementById('pswerror') as HTMLInputElement).value = 'Inscription réussie';
          break;
        }
        case false: {
          (document.getElementById('pswerror') as HTMLInputElement).value = 'Je n\'ai pas réussi à t\'inscrire je suis désolé(e) :(';
          break;
        }
      }
    });

  }
}
