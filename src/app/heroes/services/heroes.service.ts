import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/Heroe';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  URI: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.URI}/heroes`)
  }

  getHeroe(heroeId: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.URI}/heroes/${heroeId}`)
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.URI}/heroes?q=${termino}&_limit=6`)
  }

  addHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.URI}/heroes`, heroe)
  }

  updateHeroe(heroeId: string, heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.URI}/heroes/${heroeId}`, heroe)
  }

  deleteHeroe(heroeId: string): Observable<any> {
    return this.http.delete<any>(`${this.URI}/heroes/${heroeId}`)
  }

}
