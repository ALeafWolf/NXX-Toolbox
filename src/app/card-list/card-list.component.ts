import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalVariable } from '../global-variable';
import { sortSkill } from '../model/card-statistics';
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
        slot
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
        slot
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

  constructor(private _apollo: Apollo) {

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
      this.loadCardWithLang(result.data.cards);
      this.isLoaded = true;
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    })
  }

  loadCardWithLang(cards: any[]) {
    let cs = [];
    cards.forEach(card => {
      let c = { ...card };
      c.n = this.lang == 'zh' ? card.name : card.nameEN;
      if(c.name=='入局') console.log(c)
      c.skills = sortSkill(card.skills, card.rarity);
      cs.push(c);
    })
    this.allCards = cs;
    this.cards = cs;
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
