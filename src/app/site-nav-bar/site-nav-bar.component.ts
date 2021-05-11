import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'site-nav-bar',
  templateUrl: './site-nav-bar.component.html',
  styleUrls: ['./site-nav-bar.component.scss']
})
export class SiteNavBarComponent implements OnInit {
  isMenuCollapsed;
  language;

  constructor() { 
  }

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.language = localStorage.getItem('language')
  }

  changeLanguage(){
    localStorage.setItem('language', this.language)
    location.reload()
  }

}
