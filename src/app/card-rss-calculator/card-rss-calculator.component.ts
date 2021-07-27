import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { SkillInfo, ExpChipInfo } from '../model/card-statistics';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-card-rss-calculator',
  templateUrl: './card-rss-calculator.component.html',
  styleUrls: ['./card-rss-calculator.component.scss']
})
export class CardRssCalculatorComponent implements OnInit {

  character = "夏彦";
  charChip = "思维";
  type = "逻辑";
  rarity = "R";
  lv = 1;
  minLv = 1;
  maxLv = 70;

  //for calculating exp chips
  requiredExp = 0;
  presetExpChips = [99, 99, 99, 99];
  usedExpChips = [0, 0, 0, 0];
  actualExp = 0;
  actualLv = 1;
  expChips = [0, 0, 0, 0];
  expChipValues;
  expChipNames;
  expChipCost;
  actualExpChipCoin = 0;
  fullRarityExp;
  rarityExp;
  //lv slider
  lv1 = 1;
  lv2 = 1;
  options: Options = {
    floor: 1,
    ceil: 70
  }

  skillA = 1
  skillB = 1
  skillC = 1
  skillCoin = 0;
  skillRss = [0, 0, 0, 0, 0, 0];
  fullSkillRssList;
  skillRssList;

  charChips = [0, 0, 0]
  typeChips = [0, 0, 0]
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
    //get evolve rss and EXP based on rarity
    this.getEvolveRss();
    this.getExpOnRarity();
    //set propority of lv slider based on rarity
    let newOptions: Options = Object.assign({}, this.options);
    if (this.rarity == 'R') {
      newOptions.ceil = 70;
      if (this.lv1 > 70) {
        this.lv1 = 70;
      }
      if (this.lv2 > 70) {
        this.lv2 = 70;
      }
    } else {
      newOptions.ceil = 100;
    }
    this.options = newOptions;

    //set skill rss
    this.fullSkillRssList.forEach(r => {
      if (r.rarity == this.rarity) {
        this.skillRssList = r.rss
      }
    })
    this.setLevel()
    this.setSkillRss()
  }

  setLevel() {
    //grab low and high value from lv slider
    let lowValue = this.lv1 <= this.lv2 ? this.lv1 : this.lv2;
    let highValue = this.lv1 > this.lv2 ? this.lv1 : this.lv2;
    let rss = this.evolveRss;

    if (this.rarity == 'R') {
      if (highValue >= 40 && lowValue < 40) {
        this.lvCoin = rss[0].coin
        this.typeChips = [rss[0].chip1, rss[0].chip2, 0]
        this.charChips = [rss[0].charChip, 0, 0]
      } else {
        this.lvCoin = 0;
        this.typeChips = [0, 0, 0];
        this.charChips = [0, 0, 0];
      }
    } else if (this.rarity == 'MR') {
      if (highValue >= 70 && lowValue < 70) {
        this.lvCoin = rss[0].coin;
        this.typeChips = [0, rss[0].chip1, rss[0].chip2];
        this.charChips = [0, 0, rss[0].charChip];
      } else {
        this.lvCoin = 0;
        this.typeChips = [0, 0, 0];
        this.charChips = [0, 0, 0];
      }
    }
    //SR and SSR
    else {
      let c = 0;
      let typeC = [0, 0, 0];
      let charC = [0, 0, 0];
      if (highValue >= 40 && lowValue < 40) {
        c += rss[0].coin
        typeC[0] += rss[0].chip1
        typeC[1] += rss[0].chip2
        charC[1] += rss[0].charChip
      }
      if (highValue >= 70 && lowValue < 70) {
        c += rss[1].coin
        typeC[1] += rss[1].chip1
        typeC[2] += rss[1].chip2
        charC[2] += rss[1].charChip
      }
      this.lvCoin = c
      this.typeChips = typeC;
      this.charChips = charC;
    }
    this.calculateExp(lowValue, highValue);
  }

  calculateExp(lowLv: number, highLv: number) {
    this.requiredExp = 0
    for (let i = lowLv - 1; i < highLv - 1; i++) {
      this.requiredExp += this.rarityExp[i];
    }
    //get actual exp and coin cost
    this.calculateExpChips();
    if (this.actualExp < this.requiredExp) {
      this.getActualLv(lowLv, highLv, this.actualExp);
    } else {
      //calculate the lv if actual exp is not enough
      this.actualLv = highLv;
    }
  }

  calculateExpChips() {
    let remainChips: number[] = [];
    let expReminder = this.requiredExp;
    this.actualExpChipCoin = 0;
    this.actualExp = 0;
    for (let i = 3; i >= 0; i--) {
      if (this.presetExpChips[i] * this.expChipValues[i] < expReminder) {
        this.usedExpChips[i] = this.presetExpChips[i];
      } else {
        this.usedExpChips[i] = Math.floor(expReminder / this.expChipValues[i]);
        if (this.usedExpChips[i] < this.presetExpChips[i]) {
          remainChips.push(i);
        }
      }
      this.actualExpChipCoin += this.usedExpChips[i] * this.expChipCost[i];
      expReminder -= this.usedExpChips[i] * this.expChipValues[i];
      this.actualExp += this.usedExpChips[i] * this.expChipValues[i];
    }
    if (remainChips.length > 0 && expReminder > 0) {
      //set chip to overcome the remaining exp
      this.getChipForRemainExp(remainChips, expReminder);
    }
    if (this.actualExp < this.requiredExp) {
      let lowValue = this.lv1 <= this.lv2 ? this.lv1 : this.lv2;
      let highValue = this.lv1 > this.lv2 ? this.lv1 : this.lv2;
      this.getActualLv(lowValue, highValue, this.actualExp);
    }
  }

  getChipForRemainExp(indexs: number[], exp: number) {
    let chip = -1;
    for (let i = 0; i < indexs.length; i++) {
      let index = indexs[i];
      if (exp <= this.expChipValues[index]) {
        chip = index;
      }
    }
    if (chip != -1) {
      this.usedExpChips[chip] += 1;
      this.actualExp += this.expChipValues[chip];
    }
  }

  getActualLv(lowLv: number, highLv: number, actualExp: number) {
    if(actualExp > 0){
      this.actualLv = highLv;
    }
    let i = lowLv - 1;
    let maxRange = highLv - 1;
    while (actualExp > 0 && i < maxRange) {
      actualExp -= this.rarityExp[i++];
      if (actualExp < 0) {
        this.actualLv = i;
      }
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
