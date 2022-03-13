import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/Heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: []
})
export class AgregarComponent implements OnInit {

  creadores: string[] = ['DC Comics', 'Marvel Comics']

  heroeId: string | null = ''

  heroe!: Heroe

  heroeForm: FormGroup = this.fb.group({
    superhero: [''],
    alter_ego: [''],
    characters: [''],
    first_appearance: [''],
    publisher: [''],
    alt_img: [''],
  })

  constructor(
    private fb: FormBuilder,
    private heroeService: HeroesService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.heroeId = this.route.snapshot.paramMap.get('id')
    if (this.heroeId) {
      this.heroeService.getHeroe(this.heroeId)
        .subscribe(heroe => {
          const { id, ...heroeUpdate } = heroe
          this.heroe = heroe
          this.heroeForm.setValue(heroeUpdate)
        })
    }
  }

  mostrarSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 4000,
    });
  }

  guardarHeroe() {
    if (this.heroeForm.invalid) return

    if (this.heroeId) {
      this.heroeService.updateHeroe(this.heroeId, this.heroeForm.value)
        .subscribe(resp => {
          this.heroeForm.reset()
          this.mostrarSnackBar('Registro actualizado')
          this.router.navigate(['/heroes', resp.id])
        })
    } else {
      this.heroeService.addHeroe(this.heroeForm.value).subscribe(resp => {
        this.heroeForm.reset()
        this.mostrarSnackBar('Registro guardado')
        this.router.navigate(['/heroes', resp.id])
      })
    }

  }

}
