import { UsuariosComponent } from '../usuarios/usuarios.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.scss']
})
export class DialogUsuarioComponent implements OnInit {
  cadastrar=true;
  nome= new FormControl('',[Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  telefone = new FormControl('',[Validators.required, Validators.pattern('[0-9]{9}')]);
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data[0])
    this.nome.setValue(`${this.data[0].nome}`)
    this.email.setValue(`${this.data[0].email}`)
    this.telefone.setValue(`${this.data[0].telefone}`)
  }
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
