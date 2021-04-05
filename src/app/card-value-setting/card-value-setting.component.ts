import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data-service/data.service';


@Component({
  selector: 'app-card-value-setting',
  templateUrl: './card-value-setting.component.html',
  styleUrls: ['./card-value-setting.component.scss']
})
export class CardValueSettingComponent implements OnInit {

  char: String;
  id: String;
  cards;
  card;

  constructor(private _route: ActivatedRoute, private _data: DataService) {
    this.char = this._route.snapshot.params.charname
    this.id = this._route.snapshot.params.id

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
