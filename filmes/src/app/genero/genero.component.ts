import { DialogGeneroComponent } from './../dialog-genero/dialog-genero.component';
import { CriarGeneros } from './../models/criar-generos.model';
import { SalvarFilmesService } from './../services/salvar-filmes.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {
  genero= new FormControl('',[Validators.required]);
  listaGeneros:any=[];
  constructor(
    private salvarGeneros: SalvarFilmesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.salvarGeneros.lerGeneros().subscribe({
      next:(genero: CriarGeneros[])=>{
        console.log(genero);
        this.listaGeneros=genero;
        console.log(this.listaGeneros)
      },
      error:()=>{
        console.log('deu algo errado');

      }
    })
  }
  OpenSnackBar(message:string,action:string){
    this.snackBar.open(message,action,{duration:2500});
  }
  Resetar(){
    this.genero.reset()
  }
  Cadastrar(){
    console.log(this.genero);
    let somaId=Number(this.listaGeneros[this.listaGeneros.length -1].id)+1;
    let body:object ={
      genero:this.genero.value,
      id:somaId.toString(),
    };
    this.salvarGeneros.PostarGeneros(body).subscribe(response =>{

    })
    this.listaGeneros[this.listaGeneros.length]=body;
    this.Resetar();
    this.OpenSnackBar('item cadastrado','OK');
  };
   //dialog editar vai ser aberto
   OpenDialog(id:string):void{
    let data: object =this.listaGeneros.filter((generos:any) => generos.id==id);
    let dialogRef=this.dialog.open(DialogGeneroComponent,{data});
    dialogRef.afterClosed().subscribe(editar=>{
      console.log(editar)
      if (editar.cadastrar) {
        this.Editar(id,editar.genero.value)
      }
    })
  }
  Editar(id:string,generoNovo:string):void{
    let body:object = {
      genero:generoNovo,
    };
    this.salvarGeneros.EditarGeneros(id,body).subscribe(response =>{console.log('editar')});
    this.listaGeneros.map((generos:any) => {
      if (generos.id==id) {
        generos.genero=generoNovo;
      }
    })
    this.OpenSnackBar('item editado','OK');
  }

  Deletar(id:string):void{
    console.log('oi')
    this.salvarGeneros.DeletarGeneros(id).subscribe(response=>{console.log('deletar',id);});
    //deletar na lista interna o componente com o id específico
    this.listaGeneros=this.listaGeneros.filter((usuario:any) => usuario.id!=id);
    this.OpenSnackBar('item deletado','OK');
  }
  getErrorMessage() {
    return'Campo obrigatório!';
  }

}
