import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Heroe } from '../../interfaces/Heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [`
    h1{
      text-align:center;
    }
  `]
})
export class BuscarComponent implements OnInit {

  heroes: Heroe[] = []

  heroesForm: FormGroup = this.fb.group({
    termino: ['']
  })

  constructor(private fb: FormBuilder, private heroesService: HeroesService, private router: Router) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSugerencias(this.heroesForm.value.termino)
      .subscribe(heroes => this.heroes = heroes)
  }

  opcionSeleccionada(event: any) {
    const heroe: Heroe = event.option.value
    this.heroesForm.controls['termino'].setValue(heroe.superhero)
    this.router.navigate(['/heroes', heroe.id])
  }

}
