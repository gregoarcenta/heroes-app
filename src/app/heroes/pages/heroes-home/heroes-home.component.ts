import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styles: [`
    .container{
      margin: 12px
    }
    .btn-logout{
      margin: 0 .5rem;
    }
  `]
})
export class HeroesHomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  get getUser() {
    return this.authService.getUser
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/auth'])
  }

}
