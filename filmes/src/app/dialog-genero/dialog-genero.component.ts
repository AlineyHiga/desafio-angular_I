import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-genero',
  templateUrl: './dialog-genero.component.html',
  styleUrls: ['./dialog-genero.component.scss']
})
export class DialogGeneroComponent implements OnInit {
  cadastrar=true;
  genero= new FormControl('',[Validators.required]);
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data[0])
    this.genero.setValue(`${this.data[0].genero}`)
  }
  getErrorMessage() {
    return'Campo obrigatório!';
  }

}
