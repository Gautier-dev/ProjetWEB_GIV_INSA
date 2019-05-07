import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  registerStatus: boolean;
  constructor(private httpClient: HttpClient, private router: Router, private location: Location) {}
  ngOnInit() {}
  connect() {
    // Recupere le textes des champs
    const pseudo = (document.getElementById('pseudo1') as HTMLInputElement).value;
    const psw = (document.getElementById('psw1') as HTMLInputElement).value;
    const data = {
      pseudo,
      psw
    };
    this.httpClient.post('http://127.0.0.1:5002/login', data, this.httpOptions).subscribe();
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
    (document.getElementById('email') as HTMLInputElement).value = 'ton pseudo est : ' + pseudo + ', ton mail est : ' + email
      + ', ton mdp est : ' + psw + ', ta confirmation de mdp est : ' + pswrepeat;
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
      password: psw
    };
    this.httpClient.post('http://127.0.0.1:5002/signup', data, this.httpOptions).subscribe(res => {
      this.registerStatus = res as boolean;
      switch (this.registerStatus) {
        case true: {
          (document.getElementById('pseudo1') as HTMLInputElement).value = 'Inscription réussie';
          break;
        }
        case false: {
          (document.getElementById('pseudo1') as HTMLInputElement).value = 'Je n\'ai pas réussi à t\'inscrire je suis désolé(e) :(';
          break;
        }
      }
    });

  }
}
