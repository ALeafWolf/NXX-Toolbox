import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalVariable } from '../global-variable';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-card-selection',
  templateUrl: './card-selection.component.html',
  styleUrls: ['./card-selection.component.scss']
})
export class CardSelectionComponent implements OnInit {

  allCards: any[];
  cards: any[];
  filterConditions = ["All", "All", "All"];
  isLoaded = false;
  imgURL = GlobalVariable.imgURL;

  userData;

  @HostListener('window:scroll') onScroll(): void {
    this.setToTopButtonDisplay()
  }

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.userData = Object.keys(localStorage);
    this.loadData();
  }

  loadData() {
    this._data.getCards().toPromise().then((cards: any[]) => {
      this.allCards = cards;
      if (this.userData) {
        this.removeChosenCard();
      }
      this.cards = this.allCards;
      this.isLoaded = true;
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    });
  }

  removeChosenCard() {
    let a = this.allCards;
    let b;
    this.userData.forEach(id => {
      b = [];
      a.forEach(card => {
        if (card.id != id) {
          b.push(card)
        }
      })
      a = b;
    });
    this.allCards = a
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

  filterCards() {
    let listHolder = []
    this.allCards.forEach(card => {
      let condition = this.filterConditions[0]
      if (condition == "All" || card.character == condition) {
        condition = this.filterConditions[1]
        if (condition == "All" || card.rarity == condition) {
          condition = this.filterConditions[2]
          if (condition == "All" || card.type == condition) {
            listHolder.push(card)
          }
        }
      }
    });
    this.cards = listHolder;
  }

  resetFilters() {
    this.filterConditions = ["All", "All", "All"];
    this.filterCards();
  }

}
