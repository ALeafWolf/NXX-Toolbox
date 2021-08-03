import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { GlobalVariable } from '../global-variable';

@Component({
  selector: 'app-card-calculator',
  templateUrl: './card-calculator.component.html',
  styleUrls: ['./card-calculator.component.scss']
})
export class CardCalculatorComponent implements OnInit {

  userData = [];
  //夏左莫陆
  charCount = [0, 0, 0, 0];
  //逻辑共情直觉
  typeCount = [0, 0, 0];
  emptyHolder;

  allSkills;

  totalPower = 0;
  secondSkills = [];
  thirdSkills = [];

  lang;
  isLoaded = false;
  imgURL = GlobalVariable.imgURL;

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('language')
    this._data.getSkills().toPromise().then((skills: any[]) => {
      this.allSkills = skills;
      this.loadUserCards()
      this.generateEmptyHolder()
      this.isLoaded = true;
    })
  }

  generateEmptyHolder() {
    let userLength = this.userData.length
    this.emptyHolder = Array(15 - userLength).fill(0)
  }

  loadUserCards() {
    Object.keys(localStorage).forEach(k => {
      //load card icon on screen, ignore language and realm related entries at localStorage
      if (k != 'language' && k.includes("realm")==false && k.includes("token")==false) {
        let i = JSON.parse(localStorage.getItem(k));
        this.loadTypeCounts(i);
        this.totalPower += i.power;
        this.switchSkillLanguage(i);
      }
    })
    if (0 != this.userData.length) {
      this.loadSkillCounts()
    }
  }

  loadTypeCounts(data: any) {
    switch (data.type) {
      case '逻辑':
        this.typeCount[0] += 1;
        break;
      case '共情':
        this.typeCount[1] += 1;
        break;
      case '直觉':
        this.typeCount[2] += 1;
        break;
    };
    switch (data.charName) {
      case '夏彦':
        this.charCount[0] += 1;
        break;
      case '左然':
        this.charCount[1] += 1;
        break;
      case '莫弈':
        this.charCount[2] += 1;
        break;
      case '陆景和':
        this.charCount[3] += 1;
        break;
    };
  }

  switchSkillLanguage(item: any) {
    if (this.lang == 'en' || this.lang == 'ko') {
      let names = []
      item.skillNames.forEach(n => {
        this.allSkills.forEach(s => {
          if (n == s.name) {
            let name = s.nameEN == '' ? s.name : s.nameEN
            names.push(name)
          }
        })
      });
      item.skillNames = names
    }
    this.userData.push(item)
  }

  //load skill statistics for chosen cards
  loadSkillCounts() {
    this.addSecondSkill(this.userData, 1)
    this.userData.forEach(data => {
      if (data.rarity != "R") {
        this.addThirdSkill(data, this.thirdSkills, 2)
      }
    })
  }

  addSecondSkill(userData: any[], skillIndex: number) {
    this.userData.forEach(data => {
      // console.log(`${data.name}: ${data.skillNames}`)
      let common = "通用"
      // skip the skill which won't get buffed based on either character or type
      if (common === data.skillTypes[skillIndex] && common === data.skillChar[skillIndex]) {
        console.log(`${data.skillNames[1]} is skipped`)
      } else {
        // skill buffing based on character
        let count = 1;
        if (common === data.skillTypes[skillIndex]) {
          switch (data.skillChar[skillIndex]) {
            case "夏彦":
              count = this.charCount[0];
              break;
            case "左然":
              count = this.charCount[1];
              break;
            case "莫弈":
              count = this.charCount[2];
              break;
            case "陆景和":
              count = this.charCount[3];
              break;
          }
        }
        // skill buffing based on type
        else if (common === data.skillChar[skillIndex]) {
          switch (data.skillTypes[skillIndex]) {
            case "逻辑":
              count = this.typeCount[0];
              break;
            case "共情":
              count = this.typeCount[1];
              break;
            case "直觉":
              count = this.typeCount[2];
              break;
          }
        }
        let isIn = false;
        this.secondSkills.forEach(skill => {
          if (skill.name == data.skillNames[skillIndex]) {
            isIn = true;
          }
        })
        if (!isIn) {
          let skill = {
            id: data.skillIDs[skillIndex],
            name: data.skillNames[skillIndex],
            num: Number(data.skillNums[skillIndex] * count),
            numType: data.skillNumTypes[skillIndex]
          };
          this.secondSkills.push(skill)
        }
      }
    })
  }

  addThirdSkill(userData: any, skillList: any[], skillIndex: number) {
    let isIn = false;
    skillList.forEach(skill => {
      if (skill.name == userData.skillNames[skillIndex]) {
        skill.num += Number(userData.skillNums[skillIndex])
        isIn = true
      }
    })
    if (!isIn) {
      this.addSkillPack(userData, skillList, skillIndex);
    }
  }

  addSkillPack(userData: any, skillList: any[], skillIndex: number) {
    let skill = {
      id: userData.skillIDs[skillIndex],
      name: userData.skillNames[skillIndex],
      num: Number(userData.skillNums[skillIndex]),
      numType: userData.skillNumTypes[skillIndex]
    }
    skillList.push(skill)
  }

  clearAllSavedData() {
    this._data.clear()
    window.location.reload()
  }

}
