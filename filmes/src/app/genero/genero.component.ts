import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {
  genero= new FormControl('',[Validators.required])
  constructor() { }

  ngOnInit(): void {
  }
  getErrorMessage() {
    return'Campo obrigatório!';
  }

}
