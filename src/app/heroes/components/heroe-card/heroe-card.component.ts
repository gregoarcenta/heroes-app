import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/Heroe';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.css']
})
export class HeroeCardComponent implements OnInit {
  @Input() heroe!: Heroe

  constructor() { }

  ngOnInit(): void {
  }

}
