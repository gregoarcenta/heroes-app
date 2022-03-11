import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/Heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      max-width:100%;
      height: auto;
      border-radius:5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroeId: string = ''
  heroe!: Heroe

  constructor(private route: ActivatedRoute, private heroesSerice: HeroesService) { }

  ngOnInit(): void {
    this.heroeId = this.route.snapshot.paramMap.get('id') || ''
    this.heroesSerice.getHeroe(this.heroeId)
      .subscribe(heroe => this.heroe = heroe)
  }

}
