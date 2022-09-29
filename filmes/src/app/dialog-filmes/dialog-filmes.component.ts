import { SalvarFilmesService } from '../services/salvar-filmes.service';
import { CriarGeneros } from '../models/criar-generos.model';
import { Component, OnInit , Inject} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-filmes',
  templateUrl: './dialog-filmes.component.html',
  styleUrls: ['./dialog-filmes.component.scss']
})
export class DialogFilmesComponent implements OnInit {
  cadastrar=true;
  listaGeneros:any=[];
  titulo= new FormControl('',[Validators.required,]);
  genero = new FormControl('', [Validators.required, Validators.pattern('valid')]);
  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    private salvarFilmes: SalvarFilmesService,
  ) { }

  ngOnInit(): void {
    this.salvarFilmes.lerGeneros().subscribe({
      next: (genero:CriarGeneros[])=>{
        this.listaGeneros=genero
      },
      error:()=>{
        console.log('deu algo errado');
      }
    })
    this.titulo.setValue(`${this.data[0].titulo}`)
    this.genero.setValue(`${this.data[0].genero}`)
  }
  getErrorMessage() {
    if (this.titulo.hasError('required')) {
      return 'Campo obrigatório!';
    }
    return
  }
}
