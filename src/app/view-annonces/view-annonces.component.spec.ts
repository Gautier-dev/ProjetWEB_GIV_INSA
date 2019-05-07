import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnnoncesComponent } from './view-annonces.component';

describe('ViewAnnoncesComponent', () => {
  let component: ViewAnnoncesComponent;
  let fixture: ComponentFixture<ViewAnnoncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAnnoncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
