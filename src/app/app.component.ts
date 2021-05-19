import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SEOService } from './services/seo/seo.service';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  lang

  constructor(public router: Router, private activatedRoute: ActivatedRoute, private _seoService: SEOService) { }

  ngOnInit() {
    // set default language to Chinese
    let lang = localStorage.getItem('language')
    if (!lang || (lang != 'EN' && lang != 'CN')) {
      localStorage.setItem('language', 'CN')
    }
    this.lang = lang

    //for google analystics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setTitle(event.urlAfterRedirects);
        gtag('config', 'G-R56QKY4DDW',
          {
            'page_title': this._seoService.getTitle(),
            'page_path': event.urlAfterRedirects
          });
      }
    })
    this._seoService.loadTags()
  }

  //change the title of page while routing
  setTitle(url: string) {
    let home = ["主页", "Home"]
    let cards = ["思绪", "Cards"]
    let cardCal = ["战力计算器", "Power Calculator"]
    let rssCal = ["养成资源计算器", "Resource Calculator"]
    let cardSele = ["思绪选择", "Card Selection"]
    let skills = ["技能", "Skills"]
    let other = ["其他", "Other"]
    let visionHistory = ["往期女神之影", "Vision History"]
    let i = 0;
    if('EN' == this.lang){
      i = 1;
    }
    let s;
    switch (url) {
      case '/home':
        s = home[i];
        break;
      case '/cards':
        s = cards[i];
        break;
      case '/card-calculator':
        s = cardCal[i];
        break;
      case '/card-rss-calculator':
        s = rssCal[i];
        break;
      case '/card-selection':
        s = cardSele[i];
        break;
      case '/skills':
        s = skills[i];
        break;
      case '/other':
        s = other[i];
        break;
      case '/vision-history':
        s = visionHistory[i];
        break;
    }
    if (s) {
      this._seoService.setTitle(s);
    }
  }

}
