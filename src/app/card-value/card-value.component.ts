import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-card-value',
  templateUrl: './card-value.component.html',
  styleUrls: ['./card-value.component.scss']
})
export class CardValueComponent implements OnInit {

  char;
  id;
  cards;
  card;

  constructor(private _route: ActivatedRoute, private _data: DataService) {
    this.id = this._route.snapshot.params.id;
    this.char = this._route.snapshot.params.charname;
  }

  ngOnInit(): void {
    this._data.getCards().subscribe((data) =>{
      this.cards = data;
      this.cards.forEach(element => {
        if(element.id == this.id){
          this.card = element
        }
      });
    })
  }

}
