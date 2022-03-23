import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SEOService } from './services/seo/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  lang;

  constructor(public router: Router, private _seoService: SEOService, private _translateService: TranslateService, private observer: BreakpointObserver) {
    this._translateService.addLangs(['zh', 'en', 'ko']);
    this._translateService.setDefaultLang('zh');
  }

  ngOnInit() {
    // set i18n, default language to Chinese
    let browserLang = navigator.language.substr(0, 2);
    let lang = localStorage.getItem('language');
    let l = 'zh';
    //if no user choice on language, set language based on browser language
    if (!lang || lang == '') {
      if (browserLang == 'en' || browserLang == 'zh' || browserLang == 'ko') {
        l = browserLang;
      }
    } else {
      //prevent wrong language exist in localStorage
      if (lang == 'en' || lang == 'zh' || lang == 'ko') {
        l = lang;
      }
    }
    localStorage.setItem('language', l)
    this._translateService.use(l);
    this.lang = l;

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

  ngAfterViewInit() {
    //responsive side nav bar
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  //change the title of page while routing
  setTitle(url: string) {
    let home = ["主页", "Home", "홈"];
    let cards = ["思绪", "Cards", "생각"];
    let cardCal = ["战力计算器", "Power Calculator", "전투력 계산기"];
    let rssCal = ["养成资源计算器", "Resource Calculator", "재료 계산기"];
    let cardSele = ["思绪选择", "Card Selection", "생각 선택"];
    let skills = ["技能", "Skills", "스킬"];
    let other = ["其他", "Other", "기타"];
    let visionHistory = ["往期女神之影", "Vision History", "여신의 그림자"];
    let merchList = ["官方周边列表", "Official Merch List", "공식 굿즈"];
    let i = 0;
    if ('en' == this.lang) {
      i = 1;
    } else if ('ko' == this.lang) {
      i = 2;
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
