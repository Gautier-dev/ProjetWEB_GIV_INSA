import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherAnnonceComponent } from './afficher-annonce.component';

describe('AfficherAnnonceComponent', () => {
  let component: AfficherAnnonceComponent;
  let fixture: ComponentFixture<AfficherAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
