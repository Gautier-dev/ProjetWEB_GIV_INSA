import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-view-annonces',
  templateUrl: './view-annonces.component.html',
  styleUrls: ['./view-annonces.component.css']
})
export class ViewAnnoncesComponent implements OnInit {

  // Paramètres de visionnage :
  idQuartier: string;
  arrondissement: 3;

  interet: 0; // Valeur à 0 : "peu importe"
  interets: [JSON];

  annonces: {};

  search() {
    this.httpClient.get('http://127.0.0.1:5002/annonces/' + this.interet + '/' + this.idQuartier).subscribe(data => {
      this.annonces = data as JSON;
    });
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://127.0.0.1:5002/interests').subscribe(data => {
      this.interets = data as [JSON];
    });
    // TEMPORAIRE : devra être défini à l'aide de l'authentification.
    this.idQuartier = 'Guillotière';
  }


}
