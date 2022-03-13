import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { User } from '../interfaces/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URI: string = 'http://localhost:3000'
  private _user?: User

  constructor(
    private http: HttpClient
  ) { }

  get getUser() {
    return { ...this._user }
  }

  isAuthenticated(): Observable<boolean> {
    const id = localStorage.getItem('id')
    if (!id) {
      return of(false)
    }
    return this.http.get<User>(`${this.URI}/usuarios/${id}`)
      .pipe(map(user => {
        this._user = user
        return true
      }))
  }

  login(): Observable<User> {
    return this.http.get<User>(`${this.URI}/usuarios/1`)
      .pipe(tap(user => {
        this._user = user
        localStorage.setItem('id', user.id + '')
      }))
  }

  logout() {
    this._user = undefined
    localStorage.clear()
  }
}
