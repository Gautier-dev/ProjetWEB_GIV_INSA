import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.css']
})

export class ListeUtilisateursComponent {
  title = 'listeUtilisateurs';
  userData: JSON;

  constructor(private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
  }


  getAllUsers() {
    this.httpClient.get('http://127.0.0.1:5002/utilisateurs').subscribe(data => {
      this.userData = data as JSON;
      console.log(this.userData);
    });
  }
}
