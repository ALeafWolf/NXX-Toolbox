import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-card-selection',
  templateUrl: './card-selection.component.html',
  styleUrls: ['./card-selection.component.scss']
})
export class CardSelectionComponent implements OnInit {

  cards;

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.getCards().subscribe((data) =>{
      this.cards = data
    })
  }

}
