import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { GlobalVariable } from '../global-variable';

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

  //for table's sort header
  arrows = ['unfold_more', 'keyboard_arrow_down', 'keyboard_arrow_up'];
  tableSortArrow = [0, 0];

  @HostListener('window:scroll') onScroll(): void {
    this.setToTopButtonDisplay()
  }

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('language');
    this.loadData();
  }

  loadData() {
    // RESTful
    this._data.getVisionHistory().toPromise().then((pools: any[]) => {
      this.configurePoolWithLang(pools);
      this.isLoaded = true;
    });
  }

  configurePoolWithLang(pools: any[]) {
    pools.forEach(pool => {
      let p = { ...pool };
      p.cardObj.forEach(c => {
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
    return pre + param;
  }

  // for sort at table
  toggleSortHeader(index: number) {
    if (this.tableSortArrow[index] == 2) {
      this.tableSortArrow[index] = 0;
    } else {
      this.tableSortArrow[index]++;
      this.tableSortArrow[index == 0 ? 1 : 0] = 0;
      this.cnPool = this.sortHistories(index, this.cnPool);
      this.globalPool = this.sortHistories(index, this.globalPool);
    }
  }

  sortHistories(index: number, pool: any[]) {
    //DEC
    if (this.tableSortArrow[index] == 1) {
      //start date
      if (index == 0) {
        pool.sort((a, b) => {
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
      }
      //end date
      else {
        pool.sort((a, b) => {
          return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
        });
      }
    }
    // AEC
    else if (this.tableSortArrow[index] == 2) {
      //start date
      if (index == 0) {
        pool.sort((a, b) => {
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        });
      }
      //end date
      else {
        pool.sort((a, b) => {
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        });
      }
    }
    return pool;
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
