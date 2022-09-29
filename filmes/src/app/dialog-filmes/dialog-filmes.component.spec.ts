import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFilmesComponent } from './dialog-filmes.component';

describe('DialogFilmesComponent', () => {
  let component: DialogFilmesComponent;
  let fixture: ComponentFixture<DialogFilmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFilmesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFilmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
