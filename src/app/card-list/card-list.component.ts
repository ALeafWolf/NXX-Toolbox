import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service/data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  allCards: any[];
  cards: any[];
  filterConditions = ["All", "All", "All"];

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.getCards().subscribe((data: any[]) =>{
      this.allCards = data
      this.cards = data
    })
  }

  resetFilters(){
    this.filterConditions = ["All", "All", "All"];
    this.filterCards();
  }

  filterCards(){
    let listHolder = []
    this.allCards.forEach(card => {
      let condition = this.filterConditions[0]
      if(condition == "All" || card.character == condition){
        condition = this.filterConditions[1]
        if(condition == "All" || card.rarity == condition){
          condition = this.filterConditions[2]
          if(condition == "All" || card.type == condition){
            listHolder.push(card)
          }
        }
      }
    });
    this.cards = listHolder;
  }

}
