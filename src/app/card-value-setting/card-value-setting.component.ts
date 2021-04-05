import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data-service/data.service';
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

  //skill rss
  coin = 0;
  rss = [0, 0, 0, 0, 0, 0];

  //for localStorage
  userData;
  star = 1;
  att = 0;
  def = 0;
  skills = [1, 1, 1];
  skillsInfo = ["", "", ""];

  constructor(private _route: ActivatedRoute, private _data: DataService) {
    this.char = this._route.snapshot.params.charname
    this.id = this._route.snapshot.params.id
    this.charRssGroup = SkillInfo.getSkillRssGroup(this.char);
  }

  ngOnInit(): void {
    this.userData = JSON.parse(this._data.getItem(this.id))

    this._data.getCards().subscribe((data:any[]) =>{
      data.forEach(c => {
        if(c.id == this.id){
          this.card = c;
          this.att = c.attack;
          this.def = c.defence;
        }
      });
    })

    this._data.getSkills().subscribe((data: any[]) => {
      this.setSkillDisplay(data)
    });

    //get skill level up rss based on card's rarity
    this._data.getSkillRssList().subscribe((data: any[]) => {
      data.forEach(d => {
        if (d.rarity == this.card.rarity) {
          this.skillLevelUpRssList = d.rss
        }
      })
      //if localStorage has user's data for this card
      if (this.userData) {
        this.skills = this.userData.skills
        this.star = this.userData.star
        this.calculateRss()
        this.calculateCardStatistic()
      }
    })
  }

  //set the string of skills that being display on the page
  setSkillDisplay(data: any[]) {
    if (this.card) {
      let des = []
      for (let i = 0; i < 3; i++) {
        let skillName = this.card.skills[i]
        for (let s of data) {
          if (s.name == skillName) {
            //calculate correct number for the skill at matching lv
            let num = (this.skills[i] - 1) * (s.nums[1] - s.nums[0]) / 9 + s.nums[0]
            //replace X in the description with correct number
            let line = s.description.toString()
            let str = line.replace("X", num.toFixed(2).toString())
            des.push(str)
          }
        }
      }
      this.skillsInfo = des
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
          if(j < 3){
            this.rss[0] += this.skillLevelUpRssList[j].impression
            this.rss[1] += this.skillLevelUpRssList[j].item
          }
          //lv5-7
          else if(j < 6){
            this.rss[2] += this.skillLevelUpRssList[j].impression
            this.rss[3] += this.skillLevelUpRssList[j].item
          }
          //lv8-10
          else{
            this.rss[4] += this.skillLevelUpRssList[j].impression
            this.rss[5] += this.skillLevelUpRssList[j].item
          }
        }
      }
    }
  }

  calculateCardStatistic(){
      let x = 1 + (this.star - 1)*0.1
      this.att = Math.round(this.att*x)
      this.def = Math.round(this.def*x)
  }

}
