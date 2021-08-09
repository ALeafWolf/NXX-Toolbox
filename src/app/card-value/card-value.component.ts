import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../services/data/data.service';
import { SEOService } from '../services/seo/seo.service';
import { CardInfo } from '../model/card-statistics';
import { GlobalVariable } from '../global-variable';
import { sortSkill } from '../model/card-statistics';
import { Apollo, gql } from 'apollo-angular';

const GET_CARD = gql`
  query GetCard($query: CardQueryInput){
    card(query: $query){
      id
      name
      type
      rarity
      character
      skills{
        id
        name
        description
        nums
        slot
      }
      influence
      defense
    }
  }
`;

const GET_CARD_EN = gql`
  query GetCardEN($query: CardQueryInput){
    card(query: $query){
      id
      nameEN
      type
      rarity
      character
      characterEN
      skills{
        id
        nameEN
        descriptionEN
        nums
        slot
      }
      influence
      defense
    }
  }
`;

@Component({
  selector: 'app-card-value',
  templateUrl: './card-value.component.html',
  styleUrls: ['./card-value.component.scss']
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
  skillLevelUpRssList;  //lv2-lv10, index 0-8
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
  skillsInfo = ["", "", ""];
  power = 0;

  isLoaded = false;

  imgURL = GlobalVariable.imgURL;

  constructor(private _route: ActivatedRoute, private _data: DataService, private _apollo: Apollo, private _seoService: SEOService) { }

  ngOnInit(): void {
    this._id = this._route.snapshot.queryParamMap.get('id') as String;
    this.lang = localStorage.getItem('language');
    this.loadData();
  }

  loadData() {
    let query: any;
    if (this.lang == 'zh') {
      query = GET_CARD;
    } else {
      query = GET_CARD_EN;
    }
    
    this._apollo.query({
      query,
      variables: {
        query: { _id: this._id }
      },
    }).toPromise().then((cResult: any) => {
      this.card = { ...cResult.data.card };
      if (this.card) {
        this.card.skills = sortSkill(this.card.skills, this.card.rarity);
        this.att = this.card.influence;
        this.def = this.card.defense;
        this.userData = JSON.parse(this._data.getItem(this.card.id));
        if (this.userData) {
          this.loadUserData();
        }
        this.power = CardInfo.calculatePower(this.card.rarity, this.star, this.skills);
        if (this.lang != 'zh') {
          this.configureCardLanguage();
        } else {
          this.card.char = this.card.character;
        }
        this.setTitle();
        this.setSkillDisplay();
        this.lv = this.card.rarity == "R" ? 70 : 100;
      }
      this.isLoaded = true;
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    });
  }

  configureCardLanguage() {
    this.card.name = this.card.nameEN;
    this.card.char = this.card.characterEN;
    let skills: any[] = [];
    let length = this.card.rarity == 'R' ? 2 : 3;
    for (let i = 0; i < length; i++) {
      let s = { ...this.card.skills[i] };
      s.name = s.nameEN;
      s.description = s.descriptionEN;
      skills.push(s);
    }
    this.card.skills = skills;
  }

  loadUserData() {
    this.hasUserData = true;
    this.skills = this.userData.skills;
    this.star = this.userData.star;
    this.calculateCardStatistic()
    this.power = CardInfo.calculatePower(this.card.rarity, this.star, this.skills);
  }

  setTitle() {
    let pre = '思绪';
    if ('en' == this.lang) {
      pre = 'Card'
    } else if ('ko' == this.lang) {
      pre = '생각'
    }
    this._seoService.setTitle(`${pre}：${this.card.name}`);
  }

  //set the string of skills that being display on the page
  setSkillDisplay() {
    this.skillsInfo = []
    let r = 3;
    if (this.card.rarity == "R") {
      r = 2;
    }
    for (let i = 0; i < r; i++) {
      let skill = this.card.skills[i];
      let num = (this.skills[i] - 1) * (skill.nums[1] - skill.nums[0]) / 9 + skill.nums[0];
      //replace X in the description with correct number
      let line = skill.description.toString();
      let str = line.replace("X", num.toFixed(2).toString());
      this.card.skills[i].description = str;
    }
  }

  calculateCardStatistic() {
    let x = 1 + (this.star - 1) * 0.1
    this.att = Math.round(this.att * x)
    this.def = Math.round(this.def * x)
  }

  deleteUserData() {
    localStorage.removeItem(this.card.id)
    console.log(`${this.card.id} is deleted`)
  }
}
