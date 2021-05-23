import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { SkillInfo, CardInfo } from '../model/card-statistics';

@Component({
  selector: 'app-card-rss-calculator',
  templateUrl: './card-rss-calculator.component.html',
  styleUrls: ['./card-rss-calculator.component.scss']
})
export class CardRssCalculatorComponent implements OnInit {

  character = "夏彦"
  charChip = "思维"
  type = "逻辑"
  rarity = "R"
  lv = 70
  minLv = 1
  maxLv = 70

  skillA = 1
  skillB = 1
  skillC = 1
  coin = 0;
  skillRss = [0, 0, 0, 0, 0, 0];
  fullSkillRssList;
  skillRssList;

  evolveRss;
  charRssGroup;
  characters = ["夏彦", "左然", "莫弈", "陆景和"]
  types = ["逻辑", "共情", "直觉"]
  rarities = ["R", "MR", "SR", "SSR"]

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.getCardEvolveRss().toPromise().then((rss: any) => {
      this.evolveRss = rss;
      this.charRssGroup = SkillInfo.getSkillRssGroup(this.character);
      this._data.getSkillRssList().toPromise().then((skillRss: any[]) => {
        this.fullSkillRssList = skillRss;
        skillRss.forEach(r => {
          if(r.rarity == this.rarity){
            this.skillRssList = r.rss
          }
        })
      })
    })
  }

  setChar() {
    //set prefix for character chip
    switch (this.character) {
      case "夏彦":
        this.charChip = "思维"
        break;
      case "左然":
        this.charChip = "均衡"
        break;
      case "莫弈":
        this.charChip = "心灵"
        break;
      case "陆景和":
        this.charChip = "无限"
        break;
    }
    //switch skill rss based on character
    this.charRssGroup = SkillInfo.getSkillRssGroup(this.character);
  }

  setType() {

  }

  setRarity(){
    this.fullSkillRssList.forEach(rss => {
      if(rss.rarity == this.rarity){
        this.skillRssList = rss
      }
    })
    this.setSkillRss()
  }

  setLevel() {
    if (this.rarity == 'R') {
      this.maxLv = 70
      if(this.lv > 70){
        this.lv = 70
      }
    }else{
      this.maxLv = 100
    }
  }

  setSkillRss(){
    this.coin = 0;
    this.skillRss = [0, 0, 0, 0, 0, 0]
    let skillLv = [this.skillA, this.skillB, this.skillC]
    for (let i = 0; i < 3; i++) {
      let lvl = skillLv[i]
      if (lvl > 1) {
        //lv2: index 0, lv10: index 8
        for (let j = 0; j < lvl - 1; j++) {
          this.coin += this.skillRssList[j].coin
          //lv2-4
          if (j < 3) {
            this.skillRss[0] += this.skillRssList[j].impression
            this.skillRss[1] += this.skillRssList[j].item
          }
          //lv5-7
          else if (j < 6) {
            this.skillRss[2] += this.skillRssList[j].impression
            this.skillRss[3] += this.skillRssList[j].item
          }
          //lv8-10
          else {
            this.skillRss[4] += this.skillRssList[j].impression
            this.skillRss[5] += this.skillRssList[j].item
          }
        }
      }
    }
  }
}
