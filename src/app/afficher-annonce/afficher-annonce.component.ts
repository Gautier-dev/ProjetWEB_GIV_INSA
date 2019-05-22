import {Component, OnInit} from '@angular/core';
import {ViewAnnoncesComponent} from '../view-annonces/view-annonces.component';

@Component({
  selector: 'app-afficher-annonce',
  templateUrl: './afficher-annonce.component.html'
})
export class AfficherAnnonceComponent implements OnInit {
  Annonce: JSON;
  constructor(private vueannonce: ViewAnnoncesComponent) {}
  ngOnInit() {

  }




}

