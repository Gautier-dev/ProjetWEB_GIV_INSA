import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteGestionComponent } from './compte-gestion.component';

describe('CompteGestionComponent', () => {
  let component: CompteGestionComponent;
  let fixture: ComponentFixture<CompteGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
