import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { GlobalVariable } from '../global-variable';
import { Apollo, gql } from 'apollo-angular';

const GET_POOLS = gql`
  query GetPools{
    card_pool_histories(limit: 1000, sortBy: _ID_ASC){
      startDate
      endDate
      type
      server
      cards{
        id
        _id
        character
        name
      }
      bid 
      bv
      twitter 
      youtube
    }
  }
`;

export type SortColumn = '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Component({
  selector: 'app-card-pool-history',
  templateUrl: './card-pool-history.component.html',
  styleUrls: ['./card-pool-history.component.scss']
})
export class CardPoolHistoryComponent implements OnInit {
  lang;
  pools;
  cnPool = [];
  globalPool = [];
  cards;
  isLoaded = false;

  imgURL = GlobalVariable.imgURL;
  bilibili = GlobalVariable.bilibili;
  weibo = GlobalVariable.weibo;
  twitter = GlobalVariable.twitter;

  @HostListener('window:scroll') onScroll(): void {
    this.setToTopButtonDisplay()
  }

  constructor(private _data: DataService, private _apollo: Apollo) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('language');
    this.loadData();
  }

  loadData() {
    // GraphQL
    // const query = GET_POOLS;

    // this._apollo.query({
    //   query
    // }).toPromise().then((result: any) => {
    //   this.configurePoolWithLang(result.data.card_pool_histories);
    //   this.isLoaded = true;
    // }).catch(err => {
    //   console.log(err);
    //   this.isLoaded = true;
    // });

    // RESTful
    this._data.getVisionHistory().toPromise().then((pools: any[]) => {
      this.configurePoolWithLang(pools);
      this.isLoaded = true;
    });
  }

  configurePoolWithLang(pools: any[]) {
    pools.forEach(pool => {
      let p = { ...pool };
      p.cards.forEach(c => {
        c.n = c.name[this.lang] ?? c.name.zh;
      });

      if (p.server == "CN") {
        this.cnPool.push(p);
      } else if (p.server == "GLOBAL") {
        this.globalPool.push(p);
      }
    })
  }

  getImgSrc(name: string) {
    let param = ""
    let post = ".webp"
    this.cards.forEach(c => {
      if (name == c.name.zh) {
        param = c.character + "/" + c.id
      }
    });
    return GlobalVariable.imgURL + param + post
  }

  getRouterLink(name: string) {
    let pre = `/card-value/`
    let param = ""
    this.cards.forEach(c => {
      if (name == c.name.zh) {
        param = c.character + "/" + c.id
      }
    });
    return pre + param
  }

  onSort({ column, direction }: SortEvent) {

  }

  //to top button
  toTopOfScreen() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  setToTopButtonDisplay() {
    let btn = document.getElementById('toTopButton');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  }
}
