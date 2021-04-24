import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../data-service/data.service';

@Component({
  selector: 'app-card-pool-history',
  templateUrl: './card-pool-history.component.html',
  styleUrls: ['./card-pool-history.component.scss']
})
export class CardPoolHistoryComponent implements OnInit {

  pools;
  cards;
  list;

  @HostListener('window:scroll') onScroll(): void {
    this.setToTopButtonDisplay()
  }

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.getCards().subscribe((data: any[]) => {
      this.cards = data
      if (this.pools) {
        this.generateCardIcon()
      }
    })
    this._data.getCardPoolHistory().subscribe((data: any[]) => {
      this.pools = data
      if (this.cards) {
        this.generateCardIcon()
      }
    })
  }

  generateCardIcon() {
    this.pools.forEach(p => {
      
    });
  }

  getImgSrc(name: string){
    let pre = `assets/images/`
    let param = ""
    let post = ".png"
    this.cards.forEach(c => {
      if(name == c.name){
        param = c.character + "/" + c.id
      }
    });
    return pre + param + post
  }

  getRouterLink(name: string){
    let pre = `/card-value/`
    let param = ""
    this.cards.forEach(c => {
      if(name == c.name){
        param = c.character + "/" + c.id
      }
    });
    return pre + param
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
