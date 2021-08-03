import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { GlobalVariable } from '../global-variable';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  lang;
  allCards: any[];
  cards: any[];
  filterConditions = ["All", "All", "All", "All"];
  isLoaded = false;
  imgURL = GlobalVariable.imgURL;

  @HostListener('window:scroll') onScroll(): void {
    this.setToTopButtonDisplay()
  }

  constructor(private _data: DataService) {

  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('language')
    this._data.getCards().subscribe((data: any[]) => {
      this.loadCardWithLang(data)
      this.isLoaded = true;
    })
  }

  loadCardWithLang(cards:any[]){
    let c = []
    cards.forEach(card => {
      if('en' == this.lang || 'ko' == this.lang){
        card.n = card.nameEN != '' ? card.nameEN : card.name
        card.name = card.nameEN != '' ? card.nameEN : card.name
        card.char = card.characterEN != '' ? card.characterEN : card.character
      }else{
        card.n = card.name
        card.name = card.name
        card.char = card.character
      }
      c.push(card)
    })
    this.allCards = c;
    this.cards = c;
  }

  //button to top
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

  resetFilters() {
    this.filterConditions = ["All", "All", "All", "All"];
    this.filterCards();
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
            condition = this.filterConditions[3]
            if(condition == "All" || card.obtainedFrom.includes(condition))
              listHolder.push(card)
          }
        }
      }
    });
    this.cards = listHolder;
  }

  removePostfix(input) {
    let a = "";
    //remove α, β, γ, I, II, III from end of the card name
    let re = /α*β*γ*\sⅠ*Ⅱ*Ⅲ*/
    a = input.replace(re, "")
    return a;
  }

}
