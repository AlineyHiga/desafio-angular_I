import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})

export class FilmesComponent implements OnInit {
  filme= new FormControl('',[Validators.required,]);
  selected = new FormControl('', [Validators.required, Validators.pattern('valid')]);

 

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  constructor() { }

  ngOnInit(): void {
  }
  getErrorMessage() {
    if (this.filme.hasError('required')) {
      return 'Campo obrigatório!';
    }
    return 
  }
}
