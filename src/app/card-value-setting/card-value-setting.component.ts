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
        _id
        ref
        name
        description
        nums
        character
        type
        slot
        id
      }
      influence
      defense
    }
  }
`;

@Component({
  selector: 'app-card-value-setting',
  templateUrl: './card-value-setting.component.html',
  styleUrls: ['./card-value-setting.component.scss']
})
export class CardValueSettingComponent implements OnInit {

  char;
  id;
  lang;
  _id;

  //from data service
  charRssGroup;
  card;
  skillLevelUpRssList;  //lv2-lv10, index 0-8
  skillList;
  allSkillList;


  //for localStorage
  userData;
  hasUserData = false;
  lv = 100;
  star = 1;
  att = 0;
  def = 0;
  power = 0;
  skills = [1, 1, 1];

  //for card-calculator
  skillRefs = [];
  skillIDs = [];
  skillNums = [];
  skillNumTypes = [];
  skillChars = []
  skillTypes = []
  skillDescriptions = [];

  isLoaded = false;

  imgURL = GlobalVariable.imgURL;

  constructor(private _route: ActivatedRoute, private _data: DataService, private _apollo: Apollo, private _seoService: SEOService) {

  }

  ngOnInit(): void {
    this._id = this._route.snapshot.queryParamMap.get('id') as String;
    this.lang = localStorage.getItem('language');
    this.loadData();
  }

  loadData() {
    // GraphQL
    // const query = GET_CARD;

    // this._apollo.query({
    //   query,
    //   variables: {
    //     query: { _id: this._id }
    //   },
    // }).toPromise().then((cResult: any) => {
    //   this.card = { ...cResult.data.card };
    //   if (this.card) {
    //     this.card.skills = sortSkill(this.card.id, this.card.skills, this.card.rarity);
    //     this.att = this.card.influence;
    //     this.def = this.card.defense;
    //     this.userData = JSON.parse(this._data.getItem(this.card.id));
    //     if (this.userData) {
    //       this.loadUserData();
    //     }
    //     this.power = CardInfo.calculatePower(this.card.rarity, this.star, this.skills);
    //     this.configureCardLanguage();
    //     this.setTitle();
    //     this.setSkillDisplay();
    //     this.lv = this.card.rarity == "R" ? 70 : 100;
    //   }
    //   this.isLoaded = true;
    // }).catch(err => {
    //   console.log(err);
    //   this.isLoaded = true;
    // });

    this._data.getCard(this._id).toPromise().then((card: any) => {
      this.card = card;
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
  }

  loadUserData() {
    this.hasUserData = true;
    this.skills = this.userData.skills;
    this.star = this.userData.star;
    this.calculateCardStatistic();
    this.power = CardInfo.calculatePower(this.card.rarity, this.star, this.skills);
  }

  configureCardLanguage() {
    let length = this.card.rarity == 'R' ? 2 : 3;
    this.card.n = this.card.name[this.lang] ?? this.card.name.zh;
    let skills: any[] = [];
    for (let i = 0; i < length; i++) {
      // for GraphQL
      // let s = { ...this.card.skills[i] };
      let s = this.card.skillObj[i];
      //store some data for /card-calculator
      this.skillRefs.push(s.ref);
      this.skillIDs.push(s._id);
      this.skillChars.push(s.character);
      this.skillTypes.push(s.type);
      s.n = s.name[this.lang] ?? s.name.zh;
      s.des = s.description[this.lang] ?? s.description.zh;
      skills.push(s);
    }
    // for GraphQL
    // this.card.skills = skills;
    this.card.skillObj = skills;
  }

  setTitle() {
    let pre = '思绪'
    if ('en' == this.lang) {
      pre = 'Card'
    } else if ('ko' == this.lang) {
      pre = '생각'
    }
    this._seoService.setTitle(`${pre}：${this.card.n}`);
  }

  //set the string of skills that being display on the page
  setSkillDisplay() {
    //reset all skill related variables
    this.skillNums = [];
    this.skillNumTypes = [];
    this.skillDescriptions = [];

    let r = this.card.rarity == "R" ? 2 : 3;

    for (let i = 0; i < r; i++) {
      // for GraphQL
      // let skill = this.card.skills[i];
      let skill = this.card.skillObj[i];
      let num = (this.skills[i] - 1) * (skill.nums[1] - skill.nums[0]) / 9 + skill.nums[0];
      num = Number.parseFloat(num.toFixed(2));
      this.skillNums.push(num);

      //replace X in the description with correct number
      let line = skill.des;
      if (line.includes("%")) {
        this.skillNumTypes.push("%")
      } else {
        this.skillNumTypes.push("")
      }
      let str = line.replace("X", num);
      this.skillDescriptions.push(str);
    }
  }

  calculateCardStatistic() {
    let x = 1 + (this.star - 1) * 0.1
    this.att = Math.round(this.card.influence * x)
    this.def = Math.round(this.card.defense * x)
    this.updatePower()
  }

  updatePower() {
    this.power = CardInfo.calculatePower(this.card.rarity, this.star, this.skills);
  }

  updateData() {
    this.calculateCardStatistic();
    this.setSkillDisplay();
  }

  saveUserData() {
    let d = {
      //necessary statistics of cards
      _id: this._id,
      charName: this.card.character,
      ref: this.card.ref,
      star: this.star,
      rarity: this.card.rarity,
      type: this.card.type,
      //for collect skills 2 and 3 at calculator page
      skills: this.skills,
      skillRefs: this.skillRefs,
      skillIDs: this.skillIDs,
      skillNums: this.skillNums,
      skillNumTypes: this.skillNumTypes,
      skillTypes: this.skillTypes,
      skillChar: this.skillChars,
      power: this.power,
      influence: this.att,
      defense: this.def
    }
    localStorage.setItem(this.card.ref, JSON.stringify(d));
    console.log("saved");
  }

  deleteUserData() {
    localStorage.removeItem(this.card.ref);
    console.log("deleted");
  }
}
