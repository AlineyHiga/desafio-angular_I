import { DialogUsuarioComponent } from './../dialog-usuario/dialog-usuario.component';
import { CriarUsuarios } from './../models/criar-usuarios.model';
import { SalvarFilmesService } from './../services/salvar-filmes.service';
import {Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],

})
export class UsuariosComponent implements OnInit {
  listaUsuarios:any=[]
  nome= new FormControl('',[Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  telefone = new FormControl('',[Validators.required, Validators.pattern('[0-9]{9}')]);
  constructor(
    public dialog: MatDialog,
    private salvarFilmes: SalvarFilmesService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {

    this.salvarFilmes.lerUsuarios().subscribe({
      next: (usuario: CriarUsuarios[] )=>{
        console.log(usuario);
        this.listaUsuarios=usuario;
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
    this.nome.reset()
    this.email.reset()
    this.telefone.reset()
  }
  Cadastrar(){
    console.log(this.nome);
    let somaId=Number(this.listaUsuarios[this.listaUsuarios.length -1].id)+1;
    let body:object ={
      nome:this.nome.value,
      email:this.email.value,
      telefone:this.telefone.value,
      id:somaId.toString(),
    };
    this.salvarFilmes.PostarUsuarios(body).subscribe(response =>{
      console.log(response);
    })
    this.listaUsuarios[this.listaUsuarios.length]=body;
    this.Resetar();
    this.OpenSnackBar('item cadastrado','OK');
  };
   //dialog editar vai ser aberto
   OpenDialog(id:string):void{
    let data: object =this.listaUsuarios.filter((usuarios:any) => usuarios.id==id);
    let dialogRef=this.dialog.open(DialogUsuarioComponent,{data});
    dialogRef.afterClosed().subscribe(editar=>{
      console.log(editar)
      if (editar.cadastrar) {
        this.Editar(id,editar.nome.value,editar.email.value,editar.telefone.value)
      }
    })
  }
  Editar(id:string,NomeUsuario:string,EmailUsuario:string,TelefoneUsuario:string):void{
    let body:object = {
      nome:NomeUsuario,
      email:EmailUsuario,
      telefone:TelefoneUsuario,
    };
    this.salvarFilmes.EditarUsuarios(id,body).subscribe(response =>{console.log('editar')});
    this.listaUsuarios.map((usuarios:any) => {
      if (usuarios.id==id) {
        usuarios.nome=NomeUsuario;
        usuarios.email=EmailUsuario;
        usuarios.telefone=TelefoneUsuario;
      }
    })
    this.OpenSnackBar('item editado','OK');
  }

  Deletar(id:string):void{
    console.log('oi')
    this.salvarFilmes.DeletarUsuarios(id).subscribe(response=>{console.log('deletar',id);});
    //deletar na lista interna o componente com o id específico
    this.listaUsuarios=this.listaUsuarios.filter((usuario:any) => usuario.id!=id);
    this.OpenSnackBar('item deletado','OK');
  }

  //função de erro para nome
  getErrorMessageNome():string {
    if ( this.nome.hasError('required')) {
      return 'Campo obrigatório!';
    }
    return''
  }
  //função de erro para o email
  getErrorMessageEmail():string {
    if(this.email.hasError('required')){
      return 'Campo obrigatório!';
    }
    return this.email.hasError('email') ? 'E-mail inválido' : '';
  }
  //função de erro para o telefone
  getErrorMessageTelefone():string{
    if ( this.telefone.hasError('required')) {
      return 'Campo obrigatório!';
    }
    return 'Telefone inválido!'
  }
}
