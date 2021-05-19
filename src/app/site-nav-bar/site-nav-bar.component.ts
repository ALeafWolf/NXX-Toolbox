import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'site-nav-bar',
  templateUrl: './site-nav-bar.component.html',
  styleUrls: ['./site-nav-bar.component.scss']
})
export class SiteNavBarComponent implements OnInit {
  isMenuCollapsed;
  language;

  constructor(private _translateService: TranslateService) { 
  }

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.language = localStorage.getItem('language')
  }

  changeLanguage(){
    localStorage.setItem('language', this.language)
    this._translateService.use(localStorage.getItem('language'))
    location.reload()
  }
}
