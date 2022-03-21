import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalVariable } from '../global-variable';
import { DataService } from '../services/data/data.service';

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

  //for table's sort header
  arrows = ['unfold_more', 'keyboard_arrow_down', 'keyboard_arrow_up'];
  tableSortArrow = [0, 0];

  @HostListener('window:scroll') onScroll(): void {
    this.setToTopButtonDisplay()
  }

  constructor(private _data: DataService) {

  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('language');
    this.loadData();
  }

  loadData() {
  // RESTful
    this._data.getCards().toPromise().then((cards: any[]) => {
      this.loadCardWithLang(cards);
      this.isLoaded = true;
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    });
  }

  loadCardWithLang(cards: any[]) {
    let cs = [];
    cards.forEach(card => {
      let c = { ...card };
      c.n = card.name[this.lang] ?? card.name.zh;
      cs.push(c);
    })
    this.allCards = cs;
    this.cards = [...this.allCards];
  }

  setFullRankStatistic(num: number) {
    return Math.round(num * 1.4);
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
    this.cards = this.allCards;
    this.tableSortArrow = [0, 0];
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
    if (this.tableSortArrow != [0, 0]) {
      this.sortCards(this.tableSortArrow[0] == 0 ? this.tableSortArrow[0] : this.tableSortArrow[1]);
    }
  }

  // for sort at table
  toggleSortHeader(index: number) {
    if (this.tableSortArrow[index] == 2) {
      this.tableSortArrow[index] = 0;
    } else {
      this.tableSortArrow[index]++;
      this.tableSortArrow[index == 0 ? 1 : 0] = 0;
      this.sortCards(index);
    }
  }

  sortCards(index: number) {
    //DEC
    if (this.tableSortArrow[index] == 1) {
      //influence
      if (index == 0) {
        this.cards.sort((a, b) => {
          return b.influence - a.influence;
        });
      }
      //defense
      else {
        this.cards.sort((a, b) => {
          return b.defense - a.defense;
        });
      }
    }
    // AEC
    else if (this.tableSortArrow[index] == 2) {
      //influence
      if (index == 0) {
        this.cards.sort((a, b) => {
          return a.influence - b.influence;
        });
      }
      //defense
      else {
        this.cards.sort((a, b) => {
          return a.defense - b.defense;
        });
      }
    }
  }

  removePostfix(input) {
    let a = "";
    //remove α, β, γ, I, II, III from end of the card name
    let re = /α*β*γ*\sⅠ*Ⅱ*Ⅲ*/
    a = input.replace(re, "")
    return a;
  }

}
