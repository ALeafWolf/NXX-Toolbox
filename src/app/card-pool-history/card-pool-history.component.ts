import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { GlobalVariable } from '../global-variable';

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

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.getCards().toPromise().then((data: any[]) => {
      this.cards = data;
      this._data.getVisionHistory().toPromise().then((data: any[]) => {
        this.pools = data;
        this.isLoaded = true;
        this.sortPools(data);
      })
    })
  }

  sortPools(pools: any[]) {
    pools.forEach(p => {
      if (p.server == 'CN') {
        this.cnPool.push(p);
      } else if (p.server == 'GLOBAL') {
        this.globalPool.push(p);
      }
    });
  }

  getImgSrc(name: string) {
    let param = ""
    let post = ".webp"
    this.cards.forEach(c => {
      if (name == c.name) {
        param = c.character + "/" + c.id
      }
    });
    return GlobalVariable.imgURL + param + post
  }

  getRouterLink(name: string) {
    let pre = `/card-value/`
    let param = ""
    this.cards.forEach(c => {
      if (name == c.name) {
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
