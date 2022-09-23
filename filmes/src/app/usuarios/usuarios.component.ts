import {Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],

})
export class UsuariosComponent implements OnInit {
  nome= new FormControl('',[Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  telefone = new FormControl('',[Validators.required]);
  constructor(
  ) { }
  ngOnInit(): void {

  }
  //função de erro para nome
  getErrorMessageNome() {
    if ( this.nome.hasError('required')) {
      return 'Campo obrigatório!';
    }
    return 
  }
  //função de erro para o email
  getErrorMessageEmail():string {
    if(this.email.hasError('required')){
      return 'Campo obrigatório!';
    }
    return this.email.hasError('email') ? 'E-mail inválido' : '';
  }
  //função de erro para o telefone
  getErrorMessageTelefone(){
    if ( this.telefone.hasError('required')) {
      return 'Campo obrigatório!';
    }
    return 
  }
}
