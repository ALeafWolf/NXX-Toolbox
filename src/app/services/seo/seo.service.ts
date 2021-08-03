import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  title = ["牛叉叉牌工具箱：未定事件簿多功能辅助网站", "NXX Toolbox: Multi-functional Support Site for Tears of Themis", "NXX Toolbox: 미해결사건부 다기능 지원 사이트"];
  description = "战力计算器，思绪和技能索引，及其他功能待你探索~";
  image = "assets/images/meta-img.png";
  url = "https://aleafwolf.github.io/NXX-Toolbox";
  lang = localStorage.getItem('language')

  constructor(private _title: Title, private _meta: Meta) {
  }

  getTitle(){
    return this._title.getTitle()
  }

  setTitle(title){
    let i = 0;
    if (this.lang == 'en') {
      i = 1;
    } else if (this.lang == 'ko') {
      i = 2;
    }
    this._title.setTitle(`${title} | ${this.title[i]}`);
  }

  loadTags(){
    this._meta.addTags([
      {name: "title", content: this.title[0]},
      {name: "description", content: this.description},
      {property: "og:type", content: "website"},
      {property: "og:url", content: this.url},
      {property: "og:title", content: this.title[0]},
      {property: "og:description", content: this.description},
      {property: "og:image", content: this.image},
      {property: "twitter:card", content: "summary_large_image"},
      {property: "twitter:url", content: this.url},
      {property: "twitter:title", content: this.title[0]},
      {property: "twitter:description", content: this.description},
      {property: "twitter:image", content: this.image}
    ])
  }
}
