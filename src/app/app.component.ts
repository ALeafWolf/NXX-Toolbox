import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SEOService } from './services/seo/seo.service';
import { filter, map } from 'rxjs/operators';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public router: Router, private activatedRoute: ActivatedRoute, private _seoService: SEOService) {}

  ngOnInit() {
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

    // set default language to Chinese
    if(!localStorage.getItem('language')){
      localStorage.setItem('language', 'CN')
    }
    this._seoService.loadTags()
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    // let rt = this.getChild(this.activatedRoute)
    // })
  }

  //change the title of page while routing
  setTitle(url: string) {
    let s;
    switch (url) {
      case '/home':
        s = '主页';
        break;
      case '/cards':
        s = '思绪';
        break;
      case '/card-calculator':
        s = '战力计算器';
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
    }
    if(s){
      this._seoService.setTitle(s);
    }
  }

}
