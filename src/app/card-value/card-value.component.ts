import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../services/data/data.service';
import { SEOService } from '../services/seo/seo.service';
import { SkillInfo, CardInfo } from '../model/card-statistics';

@Component({
  selector: 'app-card-value',
  templateUrl: './card-value.component.html',
  styleUrls: ['./card-value.component.scss']
})
export class CardValueComponent implements OnInit {
  //from route param
  char;
  id;

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
  skillsID = ["", "", ""];
  skillsInfo = ["", "", ""];
  power = 0;


  constructor(private _route: ActivatedRoute, private _data: DataService, private _seoService: SEOService) {
    this.id = this._route.snapshot.params.id;
    this.char = this._route.snapshot.params.charname;
    this.charRssGroup = SkillInfo.getSkillRssGroup(this.char);
  }

  ngOnchanges(changes: SimpleChanges){
    console.log("OnChanges called")
  }

  ngOnInit(): void {
    console.log("OnInit called")

    this.userData = JSON.parse(this._data.getItem(this.id))

    this._data.getCards().subscribe((data: any[]) => {
      data.forEach(c => {
        if (c.id == this.id) {
          this.card = c;
          this.att = c.attack;
          this.def = c.defence;
          this._seoService.setTitle(`思绪：${this.card.name}`);
          if (c.rarity == "R") {
            this.lv = 70
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
          this.hasUserData = true;
          this.skills = this.userData.skills
          this.star = this.userData.star
          this.calculateRss()
          this.calculateCardStatistic()
          // this.setSkillDisplay();
          this.power = CardInfo.calculatePower(this.card.rarity, this.star, this.skills);
        }
      }).catch(err => console.log(err))
      if (this.card) {
        let list = []
        this.card.skills.forEach(s => {
          this._data.getSkill(s).subscribe(response => {
            list.push(response[0])
          })
        });
        this.skillList = list
      }
      this._data.getSkills().subscribe(data => {
        this.allSkillList = data
        this.setSkillDisplay();
      })

    })
  }

  //set the string of skills that being display on the page
  setSkillDisplay() {
    let id = []
    let des = []
    for (let i = 0; i < 3; i++) {
      let name = this.card.skills[i]
      for (let s of this.skillList) {
        if (s.name === name) {
          id.push(s.id)
          let j = this.card.skills.indexOf(s.name)
          //calculate correct number for the skill at matching lv
          let num = (this.skills[j] - 1) * (s.nums[1] - s.nums[0]) / 9 + s.nums[0]
          //replace X in the description with correct number
          let line = s.description.toString()
          let str = line.replace("X", num.toFixed(2).toString())
          des.push(str);
        }
      }
      this.skillsID = id;
      this.skillsInfo = des;
    }
  }

  //calculate the rss cost for leveling skills
  calculateRss() {
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
    this.att = Math.round(this.att * x)
    this.def = Math.round(this.def * x)
  }

  deleteUserData() {
    localStorage.removeItem(this.card.id)
    console.log(`${this.card.id} is deleted`)
  }
}
