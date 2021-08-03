import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SEOService } from './services/seo/seo.service';
import { TranslateService } from '@ngx-translate/core';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  lang;

  constructor(public router: Router, private _seoService: SEOService, private _translateService: TranslateService) {
    this._translateService.addLangs(['zh', 'en']);
    this._translateService.setDefaultLang('zh');
  }

  ngOnInit() {
    // set i18n, default language to Chinese
    let browserLang = navigator.language.substr(0, 2)
    let lang = localStorage.getItem('language')
    let l = 'zh'
    //if no user choice on language, set language based on browser language
    if (!lang || lang == '') {
      if (browserLang == 'en' || browserLang == 'zh') {
        l = browserLang
      }
    } else {
      //prevent wrong language exist in localStorage
      if (lang == 'en' || lang == 'zh') {
        l = lang
      }
    }
    localStorage.setItem('language', l)
    this._translateService.use(l);
    this.lang = l

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
    let home = ["主页", "Home"];
    let cards = ["思绪", "Cards"];
    let cardCal = ["战力计算器", "Power Calculator"];
    let rssCal = ["养成资源计算器", "Resource Calculator"];
    let cardSele = ["思绪选择", "Card Selection"];
    let skills = ["技能", "Skills"];
    let other = ["其他", "Other"];
    let visionHistory = ["往期女神之影", "Vision History"];
    let merchList = ["官方周边列表", "Official Merch List"];
    let i = 0;
    if ('en' == this.lang) {
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
      case '/merch-list':
        s = merchList[i];
        break;
    }
    if (s) {
      this._seoService.setTitle(s);
    }
  }

}
