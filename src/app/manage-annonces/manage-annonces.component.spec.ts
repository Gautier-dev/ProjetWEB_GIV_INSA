import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnnoncesComponent } from './manage-annonces.component';

describe('ManageAnnoncesComponent', () => {
  let component: ManageAnnoncesComponent;
  let fixture: ComponentFixture<ManageAnnoncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAnnoncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
