import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroesSerice: HeroesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.heroeId = this.route.snapshot.paramMap.get('id') || ''
    this.heroesSerice.getHeroe(this.heroeId)
      .subscribe(heroe => this.heroe = heroe)
  }

  eliminarHeroe(heroe: Heroe) {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px', data: heroe
    })
    dialog.afterClosed().subscribe(result => {
      if (result && heroe.id) {
        this.heroesSerice.deleteHeroe(heroe.id)
          .subscribe(resp => {
            console.log(resp)
            this.router.navigateByUrl('/heroes/listado')
          })

      }
    })
  }

}
