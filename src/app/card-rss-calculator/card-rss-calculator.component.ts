import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { SkillInfo, ExpChipInfo } from '../model/card-statistics';

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
  lv = 1
  prevLv = 1
  minLv = 1
  maxLv = 70
  charChips = [0, 0, 0]
  typeChips = [0, 0, 0]

  exp = 0
  expChips = [0, 0, 0, 0]
  expChipValues;
  expChipNames;
  expChipCost;
  expChipCoin = 0;
  fullRarityExp;
  rarityExp;

  skillA = 1
  skillB = 1
  skillC = 1
  skillCoin = 0;
  skillRss = [0, 0, 0, 0, 0, 0];
  fullSkillRssList;
  skillRssList;

  allEvolveRss;
  evolveRss;
  lvCoin = 0;
  charRssGroup;
  characters = ["夏彦", "左然", "莫弈", "陆景和"]
  types = ["逻辑", "共情", "直觉"]
  rarities = ["R", "MR", "SR", "SSR"]

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.charRssGroup = SkillInfo.getSkillRssGroup(this.character);
    this.expChipValues = ExpChipInfo.getExpChipValues();
    this.expChipNames = ExpChipInfo.getExpChipNames(localStorage.getItem("language"));
    this.expChipCost = ExpChipInfo.getExpChipCost();

    this._data.getCardEvolveRss().toPromise().then((rss: any) => {
      this.allEvolveRss = rss;
      this.getEvolveRss()

      this._data.getCardExp().toPromise().then((exps: any[]) => {
        this.fullRarityExp = exps;
        this.getExpOnRarity()
      })

      this._data.getSkillRssList().toPromise().then((skillRss: any[]) => {
        this.fullSkillRssList = skillRss;
        skillRss.forEach(r => {
          if (r.rarity == this.rarity) {
            this.skillRssList = r.rss
          }
        })
      })
    })
  }

  getEvolveRss() {
    switch (this.rarity) {
      case "R":
        this.evolveRss = this.allEvolveRss.R.rss
        break;
      case "MR":
        this.evolveRss = this.allEvolveRss.MR.rss
        break;
      case "SR":
        this.evolveRss = this.allEvolveRss.SR.rss
        break;
      case "SSR":
        this.evolveRss = this.allEvolveRss.SSR.rss
        break;
    }
  }

  getExpOnRarity() {
    switch (this.rarity) {
      case "R":
        this.rarityExp = this.fullRarityExp.R
        break;
      case "MR":
        this.rarityExp = this.fullRarityExp.MR
        break;
      case "SR":
        this.rarityExp = this.fullRarityExp.SR
        break;
      case "SSR":
        this.rarityExp = this.fullRarityExp.SSR
        break;
    }
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

  setRarity() {
    //get evolve rss and exp based on rarity
    this.getEvolveRss()
    this.getExpOnRarity()
    //set propority of input range based on rarity
    if (this.rarity == 'R') {
      this.maxLv = 70
      if(this.lv > 70){
        this.lv = 70
      }
    } else {
      this.maxLv = 100
    }
    //set skill rsss
    this.fullSkillRssList.forEach(r => {
      if (r.rarity == this.rarity) {
        this.skillRssList = r.rss
      }
    })
    this.setLevel()
    this.setSkillRss()
  }

  setLevel() {
    let rss = this.evolveRss
    if (this.rarity == 'R') {
      if (this.lv >= 40) {
        this.lvCoin = rss[0].coin
        this.typeChips = [rss[0].chip1, rss[0].chip2, 0]
        this.charChips = [rss[0].charChip, 0, 0]
      } else {
        this.lvCoin = 0
        this.typeChips = [0, 0, 0]
        this.charChips = [0, 0, 0]
      }
    } else if (this.rarity == 'MR') {
      if (this.lv >= 70) {
        this.lvCoin = rss[0].coin
        this.typeChips = [0, rss[0].chip1, rss[0].chip2]
        this.charChips = [0, 0, rss[0].charChip]
      } else {
        this.lvCoin = 0
        this.charChips = [0, 0, 0]
        this.typeChips = [0, 0, 0]
      }
    } else {
      let c = 0;
      let typeC = [0, 0, 0]
      let charC = [0, 0, 0]
      if (this.lv >= 40) {
        c += rss[0].coin
        typeC[0] += rss[0].chip1
        typeC[1] += rss[0].chip2
        charC[1] += rss[0].charChip
      }
      if (this.lv >= 70) {
        c += rss[1].coin
        typeC[1] += rss[1].chip1
        typeC[2] += rss[1].chip2
        charC[2] += rss[1].charChip
      }
      this.lvCoin = c
      this.typeChips = typeC;
      this.charChips = charC;
    }

    this.calculateExp()
  }

  calculateExp() {
    this.exp = 0
    for(let i = 0; i < this.lv-1; i++){
      this.exp += this.rarityExp[i]
    }
    this.calculateExpChips()
  }

  calculateExpChips(){
    // console.log(`Divide: ${this.exp/this.expChipValues[3]}\nreminder:${this.exp%this.expChipValues[3]}`)
    let reminder = this.exp;
    this.expChipCoin = 0
    for(let i = 3; i >= 0; i--){
      this.expChips[i] = Math.floor(reminder/this.expChipValues[i])
      this.expChipCoin += this.expChips[i] * this.expChipCost[i]
      reminder = reminder%this.expChipValues[i]
    }
  }

  setSkillRss() {
    this.skillCoin = 0;
    this.skillRss = [0, 0, 0, 0, 0, 0]
    let skillLv = [this.skillA, this.skillB, this.skillC]
    for (let i = 0; i < 3; i++) {
      let lvl = skillLv[i]
      if (lvl > 1) {
        //lv2: index 0, lv10: index 8
        for (let j = 0; j < lvl - 1; j++) {
          this.skillCoin += this.skillRssList[j].coin
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
