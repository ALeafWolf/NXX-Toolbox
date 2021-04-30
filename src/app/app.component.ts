import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tears-of-themis-calculator';
  //for google analystics
  constructor(public router: Router, private _titleService: Title) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setTitle(event.urlAfterRedirects);
        gtag('config', 'G-R56QKY4DDW',
          {
            'page_title': this._titleService.getTitle(),
            'page_path': event.urlAfterRedirects
          });
      }
    })
  }

  //change the title of page while routing
  setTitle(url: string) {
    let s = ''
    let p = ' - 牛叉叉牌工具箱'
    switch (url) {
      case '/home':
        s = '主页';
        break;
      case '/cards':
        s = '思绪';
        break;
      case '/card-calculator':
        s = '计算器';
        break;
      case '/card-selection':
        s = '计算器思绪选择';
        break;
      case '/skills':
        s = '技能';
        break;
      case '/other':
        s = '其他';
        break;
      case '/card-pool-history':
        s = '往期女神之影';
        break;
      default:
        p = '牛叉叉牌工具箱'
    }

    this._titleService.setTitle(s + p);

  }

}
