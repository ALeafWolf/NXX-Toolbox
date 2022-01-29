import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { GlobalVariable } from '../global-variable';

@Component({
  selector: 'app-card-release-history',
  templateUrl: './card-release-history.component.html',
  styleUrls: ['./card-release-history.component.scss']
})
export class CardReleaseHistoryComponent implements OnInit {
  lang;
  pools;
  cards;
  isLoaded = false;

  imgURL = GlobalVariable.imgURL;
  bilibili = GlobalVariable.bilibili;
  weibo = GlobalVariable.weibo;
  twitter = GlobalVariable.twitter;

  //for table's sort header
  arrows = ['unfold_more', 'keyboard_arrow_down', 'keyboard_arrow_up'];
  tableSortArrow = [0, 0];
  constructor() { }

  ngOnInit(): void {
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
