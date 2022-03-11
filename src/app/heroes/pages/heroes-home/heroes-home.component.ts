import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

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

  constructor() { }

  ngOnInit(): void {
  }

}
