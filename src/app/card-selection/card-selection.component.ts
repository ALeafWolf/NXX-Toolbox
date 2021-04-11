import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../data-service/data.service';

@Component({
  selector: 'app-card-selection',
  templateUrl: './card-selection.component.html',
  styleUrls: ['./card-selection.component.scss']
})
export class CardSelectionComponent implements OnInit {

  allCards: any[];
  cards: any[];
  filterConditions = ["All", "All", "All"];

  userData;

  @HostListener('window:scroll') onScroll(): void {
    this.setToTopButtonDisplay()
  }

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.getCards().subscribe((data: any[]) =>{
      this.userData = Object.keys(localStorage)
      this.allCards = data
      if(this.userData){
        this.removeChosenCard(data)
      }else{
        this.allCards = data
      }
      this.cards = this.allCards
    })
  }

  setToTopButtonDisplay() {
    let btn = document.getElementById('toTopButton');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  }

  toTopOfScreen() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  removeChosenCard(cards:any[]){
    let a = cards
    let b;
    this.userData.forEach(id => {
      b = []
      a.forEach(card => {
        if(card.id != id){
          b.push(card)
        }
      })
      a = b
    });
    this.allCards = a
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

  resetFilters(){
    this.filterConditions = ["All", "All", "All"];
    this.filterCards();
  }

}
