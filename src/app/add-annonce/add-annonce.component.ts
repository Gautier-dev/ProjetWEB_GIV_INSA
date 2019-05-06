import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  username = '';
  quartier = '';
  arrondissement = 0;
  numInteret = 0;
  description = '';
  titre = '';
  scale = '';
  status = 0;


  constructor(private httpClient: HttpClient, private router: Router, private location: Location) {
  }

  ngOnInit() {
  }

  post() {
    const data = {
      idUser: this.username,
      idInteret: this.numInteret,
      description: this.description,
      title: this.titre,
      scale: this.scale
    };
    this.status = 1;
    // @ts-ignore
    this.httpClient.post('http://127.0.0.1:5002/annonces', data, this.httpOptions).subscribe(location.reload());
  }
}


