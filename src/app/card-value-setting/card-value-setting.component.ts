import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../services/data/data.service';
import { SEOService } from '../services/seo/seo.service';
import { SkillInfo, CardInfo } from '../model/card-statistics';

@Component({
  selector: 'app-card-value-setting',
  templateUrl: './card-value-setting.component.html',
  styleUrls: ['./card-value-setting.component.scss']
})
export class CardValueSettingComponent implements OnInit {

  char;
  id;

  //from data service
  charRssGroup;
  card;
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
  skillsID = [];
  skillNames = [];
  skills = [1, 1, 1];
  skillNums = [];
  skillNumTypes = [];
  skillChars = []
  skillTypes = []
  skillsInfo = [];
  power = 0;

  constructor(private _route: ActivatedRoute, private _data: DataService, private _seoService: SEOService) {
    this.char = this._route.snapshot.params.charname
    this.id = this._route.snapshot.params.id
    this.charRssGroup = SkillInfo.getSkillRssGroup(this.char);
  }

  ngOnInit(): void {
    this.userData = JSON.parse(this._data.getItem(this.id))

    this._data.getCards().toPromise().then((data: any[]) => {
      data.forEach(c => {
        if (c.id == this.id) {
          this.card = c;
          this.att = c.influence;
          this.def = c.defence;
          this._seoService.setTitle(`思绪：${this.card.name}`);
          if (c.rarity == "R") {
            this.lv = 70
            this.skills = [1, 1]
          }
        }
      });
      this.power = CardInfo.calculatePower(this.card.rarity, this.star, this.skills);
      this._data.getSkillRssList().toPromise().then((data: any[]) => {
        data.forEach(d => {
          if (d.rarity == this.card.rarity) {
            this.skillLevelUpRssList = d.rss
          }
        })
        //if localStorage has user's data for this card
        if (this.userData) {
          this.loadUserData();
        }
      }).catch(err => console.log(err))
      if (this.card) {
        this.loadSkillInfo()
      }
    })
  }

  loadUserData() {
    this.hasUserData = true;
    this.skills = this.userData.skills
    this.star = this.userData.star
    this.calculateRss()
    this.calculateCardStatistic()
    this.power = CardInfo.calculatePower(this.card.rarity, this.star, this.skills);
  }

  loadSkillInfo() {
    let list = []
    this.card.skills.forEach(s => {
      this._data.getSkill(s).toPromise().then(response => {
        list.push(response)
      })
    });
    this.skillList = list
    this._data.getSkills().toPromise().then(data => {
      this.allSkillList = data
      this.setSkillDisplay();
    })
  }

  //set the string of skills that being display on the page
  setSkillDisplay() {
    //reset all skill related variables
    this.skillNames = []
    this.skillsID = []
    this.skillChars = []
    this.skillTypes = []
    this.skillNums = []
    this.skillNumTypes = []
    this.skillsInfo = []

    let r = 3;
    if (this.card.rarity == "R") {
      r = 2
    }

    for (let i = 0; i < r; i++) {
      let name = this.card.skills[i]
      this.skillNames.push(name)
      for (let s of this.skillList) {
        if (s.name === name) {
          this.skillsID.push(s.id)
          this.skillChars.push(s.character)
          this.skillTypes.push(s.type)
          let j = this.card.skills.indexOf(s.name)
          //calculate correct number for the skill at matching lv
          let num = (this.skills[j] - 1) * (s.nums[1] - s.nums[0]) / 9 + s.nums[0]
          this.skillNums.push(num.toFixed(2))
          //replace X in the description with correct number
          let line = s.description.toString()
          if (line.includes("%")) {
            this.skillNumTypes.push("%")
          } else {
            this.skillNumTypes.push("")
          }
          let str = line.replace("X", num.toFixed(2).toString())
          this.skillsInfo.push(str);
        }
      }
    }
  }

  //calculate the rss cost for leveling skills
  calculateRss() {
    this.coin = 0;
    this.rss = [0, 0, 0, 0, 0, 0]
    for (let i = 0; i < 3; i++) {
      let lvl = this.skills[i]
      if (lvl > 1) {
        //lv2: index 0, lv10: index 8
        for (let j = 0; j < lvl - 1; j++) {
          this.coin += this.skillLevelUpRssList[j].coin
          //lv2-4
          if (j < 3) {
            this.rss[0] += this.skillLevelUpRssList[j].impression
            this.rss[1] += this.skillLevelUpRssList[j].item
          }
          //lv5-7
          else if (j < 6) {
            this.rss[2] += this.skillLevelUpRssList[j].impression
            this.rss[3] += this.skillLevelUpRssList[j].item
          }
          //lv8-10
          else {
            this.rss[4] += this.skillLevelUpRssList[j].impression
            this.rss[5] += this.skillLevelUpRssList[j].item
          }
        }
      }
    }
  }

  calculateCardStatistic() {
    let x = 1 + (this.star - 1) * 0.1
    this.att = Math.round(this.card.attack * x)
    this.def = Math.round(this.card.defence * x)
  }

  updatePower() {
    this.power = CardInfo.calculatePower(this.card.rarity, this.star, this.skills);
  }

  updateData() {
    this.calculateRss();
    this.calculateCardStatistic();
    this.setSkillDisplay();
  }

  saveUserData() {
    let d = {
      //necessary statistics of cards
      charName: this.card.character,
      name: this.card.name,
      star: this.star,
      rarity: this.card.rarity,
      type: this.card.type,
      //for collect skills 2 and 3 at calculator page
      skills: this.skills,
      skillIDs: this.skillsID,
      skillNames: this.skillNames,
      skillNums: this.skillNums,
      skillNumTypes: this.skillNumTypes,
      skillTypes: this.skillTypes,
      skillChar: this.skillChars,
      power: this.power
    }
    localStorage.setItem(this.card.id, JSON.stringify(d))
    console.log("saved")
  }

  deleteUserData() {
    localStorage.removeItem(this.card.id)
    console.log("deleted")
  }
}
