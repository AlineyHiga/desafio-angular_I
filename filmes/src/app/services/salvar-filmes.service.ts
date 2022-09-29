import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CriarFilmes } from '../models/criar-filmes.model';
import { CriarUsuarios } from '../models/criar-usuarios.model';
import { CriarGeneros } from '../models/criar-generos.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SalvarFilmesService {
  private listaFilmes: object;
  private url = ' http://localhost:3000';

  constructor(private httpClient: HttpClient) {
    this.listaFilmes= [];
  }

  get Filmes():object{
    return this.listaFilmes
  }
  //para a pag filmes
  lerFilmes(): Observable<CriarFilmes[]>{
    return this.httpClient.get<CriarFilmes[]>(`${this.url}/filme`);
  }
  Postarfilmes(data:object):Observable<CriarFilmes[]>{
    return this.httpClient.post<CriarFilmes[]>(`${this.url}/filme`,data)
  }
  DeletarFilmes(id:string):Observable<CriarFilmes[]>{
    return this.httpClient.delete<CriarFilmes[]>(`${this.url}/filme/${id}`)
  }
  EditarFilmes(id:string,data:object):Observable<CriarFilmes[]>{
    return this.httpClient.put<CriarFilmes[]>(`${this.url}/filme/${id}`,data)
  }
  //para o genero
  lerGeneros(): Observable<CriarGeneros[]>{
    return this.httpClient.get<CriarGeneros[]>(`${this.url}/genero`);
  }
  PostarGeneros(data:object):Observable<CriarGeneros[]>{
    return this.httpClient.post<CriarGeneros[]>(`${this.url}/genero`,data)
  }
  DeletarGeneros(id:string):Observable<CriarGeneros[]>{
    return this.httpClient.delete<CriarGeneros[]>(`${this.url}/genero/${id}`)
  }
  EditarGeneros(id:string,data:object):Observable<CriarGeneros[]>{
    return this.httpClient.put<CriarGeneros[]>(`${this.url}/genero/${id}`,data)
  }
  //lista para o usuários
  lerUsuarios(): Observable<CriarUsuarios[]>{
    return this.httpClient.get<CriarUsuarios[]>(`${this.url}/usuario`);
  }
  PostarUsuarios(data:object):Observable<CriarUsuarios[]>{
    return this.httpClient.post<CriarUsuarios[]>(`${this.url}/usuario`,data)
  }
  DeletarUsuarios(id:string):Observable<CriarUsuarios[]>{
    return this.httpClient.delete<CriarUsuarios[]>(`${this.url}/usuario/${id}`)
  }
  EditarUsuarios(id:string,data:object):Observable<CriarUsuarios[]>{
    return this.httpClient.put<CriarUsuarios[]>(`${this.url}/usuario/${id}`,data)
  }

}
