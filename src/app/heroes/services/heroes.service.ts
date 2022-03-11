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

}
