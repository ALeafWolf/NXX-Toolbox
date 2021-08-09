import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { GlobalVariable } from '../global-variable';
import { Apollo, gql } from 'apollo-angular';

const GET_CARDS = gql`
  query GetCards{
    cards(limit: 1000, sortBy: _ID_ASC){
      _id
      id
      name
      type
      rarity
      character
      skills
      {
        id
        name
      }
      obtainedFrom
    }
  }
`;

const GET_CARDS_EN = gql`
  query GetCards{
    cards(limit: 1000, sortBy: _ID_ASC){
      _id
      id
      nameEN
      type
      rarity
      character
      skills
      {
        id
        name
      }
      obtainedFrom
    }
  }
`;

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

  constructor(private _data: DataService, private _apollo: Apollo) {

  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('language');
    this.loadData();
  }

  loadData() {
    let query;
    if (this.lang == 'zh') {
      query = GET_CARDS;
    } else {
      query = GET_CARDS_EN;
    }
    this._apollo.query({
      query
    }).toPromise().then((result: any) => {
      if (this.lang != 'zh') {
        this.loadCardWithLang(result.data.cards);
      } else {
        this.allCards = { ...result.data.cards };
        this.cards = this.allCards;
      }
      this.isLoaded = true;
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    })
  }

  loadCardWithLang(cards: any[]) {
    let chars = []
    cards.forEach(card => {
      let c = { ...card }
      c.name = card.nameEN != '' ? card.nameEN : card.name;
      chars.push(c)
    })
    this.allCards = chars;
    this.cards = chars;
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
            if (condition == "All" || card.obtainedFrom.includes(condition))
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
