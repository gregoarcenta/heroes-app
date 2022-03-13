import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/Heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: []
})
export class AgregarComponent implements OnInit {

  creadores: string[] = ['DC Comics', 'Marvel Comics']

  heroeId: string | null = ''

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  heroeForm: FormGroup = this.fb.group({
    superhero: [this.heroe.superhero],
    alter_ego: [this.heroe.alter_ego],
    characters: [this.heroe.characters],
    first_appearance: [this.heroe.first_appearance],
    publisher: [Publisher.DCComics],
    alt_img: [this.heroe.alt_img],
  })

  constructor(
    private fb: FormBuilder,
    private heroeService: HeroesService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.heroeId = this.route.snapshot.paramMap.get('id')
    if (this.heroeId) {
      this.heroeService.getHeroe(this.heroeId)
        .subscribe(heroe => {
          this.heroe = heroe
          this.heroeForm.controls['superhero'].setValue(heroe.superhero)
          this.heroeForm.controls['alter_ego'].setValue(heroe.alter_ego)
          this.heroeForm.controls['characters'].setValue(heroe.characters)
          this.heroeForm.controls['first_appearance'].setValue(heroe.first_appearance)
          this.heroeForm.controls['publisher'].setValue(heroe.publisher)
          this.heroeForm.controls['alt_img'].setValue(heroe.alt_img)
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

    this.heroe = {
      superhero: this.heroeForm.value.superhero,
      alter_ego: this.heroeForm.value.alter_ego,
      characters: this.heroeForm.value.characters,
      first_appearance: this.heroeForm.value.first_appearance,
      publisher: this.heroeForm.value.publisher,
      alt_img: this.heroeForm.value.alt_img
    }

    if (this.heroeId) {
      this.heroeService.updateHeroe(this.heroeId, this.heroe)
        .subscribe(resp => {
          this.heroeForm.reset()
          this.mostrarSnackBar('Registro actualizado')
        })
    } else {
      this.heroeService.addHeroe(this.heroe).subscribe(resp => {
        this.heroeForm.reset()
        this.mostrarSnackBar('Registro guardado')
      })
    }

  }

}
