import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() {}
  ngOnInit() {}
  connect() {}
  cancel() {
    // Supprime l'eventuelle erreur de mdp
    (document.getElementById('pswerror') as HTMLInputElement).innerHTML = '';
  }
  submit() {
    // Supprime l'eventuelle erreur de mdp
    (document.getElementById('pswerror') as HTMLInputElement).innerHTML = '';
    // Recupere le textes des champs
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const psw = (document.getElementById('psw') as HTMLInputElement).value;
    const pswrepeat = (document.getElementById('psw-repeat') as HTMLInputElement).value;
    (document.getElementById('email') as HTMLInputElement).value = 'ton mail est : ' + email
      + ', ton mdp est : ' + psw + ', ta confirmation de mdp est : ' + pswrepeat;
    if (psw !== pswrepeat) {
      // Affiche une erreur si les champs de mdp ne correspondent pas
      (document.getElementById('pswerror') as HTMLInputElement).innerHTML = 'Les mots de passe ne match pas !';
      // Efface les champs de mdp
      (document.getElementById('psw') as HTMLInputElement).value = '';
      (document.getElementById('psw-repeat') as HTMLInputElement).value = '';
    }
  }
}
