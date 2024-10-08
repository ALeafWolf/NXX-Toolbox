import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../services/data/data.service';
import { SEOService } from '../services/seo/seo.service';
import { CardInfo } from '../model/card-statistics';
import { GlobalVariable } from '../global-variable';

@Component({
  selector: 'app-card-value',
  templateUrl: './card-value.component.html',
  styleUrls: ['./card-value.component.scss'],
})
export class CardValueComponent implements OnInit {
  //from route param
  char;
  id;
  lang;
  _id;

  //from data service
  charRssGroup;
  card: any;
  skillLevelUpRssList; //lv2-lv10, index 0-8
  skillList;
  allSkillList;

  //skill rss
  coin = 0;
  rss = [0, 0, 0, 0, 0, 0];
  lv = 100;

  //for localStorage
  userData;
  hasUserData = false;
  star = 1;
  att = 0;
  def = 0;
  skills = [1, 1, 1];
  skillsInfo = ['', '', ''];
  power = 0;

  isLoaded = false;

  imgURL = GlobalVariable.imgURL;

  constructor(
    private _route: ActivatedRoute,
    private _data: DataService,
    private _seoService: SEOService
  ) {}

  ngOnInit(): void {
    this._id = this._route.snapshot.queryParamMap.get('id') as String;
    this.lang = localStorage.getItem('language');
    this.loadData();
  }

  loadData() {
    this._data.getCard(this._id).then((card: any) => {
      this.card = card;
      console.log(`card is ${this.card}`);
      if (this.card) {
        this.att = this.card.influence;
        this.def = this.card.defense;
        this.userData = JSON.parse(this._data.getItem(this.card.ref));
        if (this.userData) {
          this.loadUserData();
        }
        this.power = CardInfo.calculatePower(this.card.rarity, this.star, this.skills);
        this.configureCardLanguage();
        this.setTitle();
        this.setSkillDisplay();
        this.lv = this.card.rarity == "R" ? 70 : 100;
      }
      this.isLoaded = true;
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    })
    // this.card = this._data.getCard(this._id);
    // console.log(`card is ${this.card}`);
    // if (this.card) {
    //   this.att = this.card.influence;
    //   this.def = this.card.defense;
    //   this.userData = JSON.parse(this._data.getItem(this.card.ref));
    //   if (this.userData) {
    //     this.loadUserData();
    //   }
    //   this.power = CardInfo.calculatePower(
    //     this.card.rarity,
    //     this.star,
    //     this.skills
    //   );
    //   this.configureCardLanguage();
    //   this.setTitle();
    //   this.setSkillDisplay();
    //   this.lv = this.card.rarity == 'R' ? 70 : 100;
    // }
    // this.isLoaded = true;
  }

  configureCardLanguage() {
    this.card.n = this.card.name[this.lang] ?? this.card.name.zh;
    let skills: any[] = [];
    let length = this.card.rarity == 'R' ? 2 : 3;
    for (let i = 0; i < length; i++) {
      // for GraphQL
      // let s = { ...this.card.skills[i] };
      let s = this.card.skillObj[i];
      s.n = s.name[this.lang] ?? s.name.zh;
      s.des = s.description[this.lang] ?? s.description.zh;
      skills.push(s);
    }
    // for GraphQL
    // this.card.skills = skills;
    this.card.skillObj = skills;
  }

  loadUserData() {
    this.hasUserData = true;
    this.skills = this.userData.skills;
    this.star = this.userData.star;
    this.calculateCardStatistic();
    this.power = CardInfo.calculatePower(
      this.card.rarity,
      this.star,
      this.skills
    );
  }

  setTitle() {
    let pre = '思绪';
    if ('en' == this.lang) {
      pre = 'Card';
    } else if ('ko' == this.lang) {
      pre = '생각';
    }
    this._seoService.setTitle(`${pre}：${this.card.n}`);
  }

  //set the string of skills that being display on the page
  setSkillDisplay() {
    this.skillsInfo = [];
    let r = 3;
    if (this.card.rarity == 'R') {
      r = 2;
    }
    for (let i = 0; i < r; i++) {
      let skill = this.card.skillObj[i];
      let num =
        ((this.skills[i] - 1) * (skill.nums[1] - skill.nums[0])) / 9 +
        skill.nums[0];
      num = Number.parseFloat(num.toFixed(2));
      //replace X in the description with correct number
      let line = skill.des;
      let str = line.replace('X', num.toFixed(2).toString());
      this.skillsInfo.push(str);
    }
  }

  calculateCardStatistic() {
    let x = 1 + (this.star - 1) * 0.1;
    this.att = Math.round(this.att * x);
    this.def = Math.round(this.def * x);
  }

  deleteUserData() {
    localStorage.removeItem(this.card.ref);
    console.log(`${this.card.ref} is deleted`);
  }
}
