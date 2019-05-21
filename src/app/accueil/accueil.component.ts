import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {SignupComponent} from '../signup/signup.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  providers: [CookieService],
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  idUser: string;
  connectStatus = false;
  constructor(private httpClient: HttpClient, private router: Router, private location: Location, private cookieService: CookieService,
              private signupComponent: SignupComponent) { }
  ngOnInit() {
    this.idUser = this.signupComponent.idUser;
  }

}
