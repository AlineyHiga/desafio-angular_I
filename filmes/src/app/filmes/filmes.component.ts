import { DialogFilmesComponent } from './../dialog-filmes/dialog-filmes.component';
import { SalvarFilmesService } from '../services/salvar-filmes.service';
import { CriarFilmes } from '../models/criar-filmes.model';
import { CriarGeneros } from '../models/criar-generos.model';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})

export class FilmesComponent implements OnInit {
  listaFilmes:any=[];
  listaGeneros:any=[]
  titulo= new FormControl('',[Validators.required,]);
  genero = new FormControl('', [Validators.required, Validators.pattern('valid')]);
  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  constructor(
    public dialog: MatDialog,
    private salvarFilmes: SalvarFilmesService,
    private snackBar: MatSnackBar
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
    this.salvarFilmes.lerFilmes().subscribe({
      next: (usuario: CriarFilmes[] )=>{
        console.log(usuario);
        this.listaFilmes=usuario;
      },
      error:()=>{
        console.log('deu algo errado')
      }
    })
  }
  OpenSnackBar(message:string,action:string){
    this.snackBar.open(message,action,{duration:2500});
  }
  Resetar(){
    this.titulo.reset()
    this.genero.reset()

  }
  Cadastrar(){
    console.log(this.titulo);
    let somaId=Number(this.listaFilmes[this.listaFilmes.length -1].id)+1;
    let body:object ={
      titulo:this.titulo.value,
      genero:this.genero.value,
      id:somaId.toString(),
    };
    this.salvarFilmes.Postarfilmes(body).subscribe(response =>{
      console.log(response);
    })
    this.listaFilmes[this.listaFilmes.length]=body;
    this.Resetar();
    this.OpenSnackBar('item cadastrado','OK');
  };
   //dialog editar vai ser aberto
   OpenDialog(id:string):void{
    let data: object =this.listaFilmes.filter((filme:any) => filme.id==id);
    let dialogRef=this.dialog.open(DialogFilmesComponent,{data});
    dialogRef.afterClosed().subscribe(editar=>{
      console.log(editar)
      if (editar.cadastrar) {
        this.Editar(id,editar.titulo.value,editar.genero.value)
      }
    })
  }
  Editar(id:string,Ntitulo:string,Ngenero:string):void{
    let body:object = {
      titulo:Ntitulo,
      genero:Ngenero,
    };
    this.salvarFilmes.EditarFilmes(id,body).subscribe(response =>{console.log('editar')});
    this.listaFilmes.map((filmes:any) => {
      if (filmes.id==id) {
        filmes.titulo=Ntitulo;
        filmes.genero=Ngenero;
      }
    })
    this.OpenSnackBar('item editado','OK');
  }

  Deletar(id:string):void{
    console.log('oi')
    this.salvarFilmes.DeletarFilmes(id).subscribe(response=>{console.log('deletar',id);});
    //deletar na lista interna o componente com o id específico
    this.listaFilmes=this.listaFilmes.filter((filme:any) => filme.id!=id);
    this.OpenSnackBar('item deletado','OK');
  }
  getErrorMessage() {
    if (this.titulo.hasError('required')) {
      return 'Campo obrigatório!';
    }
    return
  }
}
