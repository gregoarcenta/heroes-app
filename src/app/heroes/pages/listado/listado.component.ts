import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/Heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    h1{
      text-align:center;
    }
  `]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = []

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
    this.heroeService.getHeroes().subscribe(heroes => {
      this.heroes = heroes
    })
  }

}
