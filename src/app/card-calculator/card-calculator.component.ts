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
      this.loadUserCards();
      this.generateEmptyHolder();
      this.isLoaded = true;
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    })
  }

  generateEmptyHolder() {
    let userLength = this.userData.length;
    console.log(userLength)
    this.emptyHolder = Array(15 - userLength).fill(0);
  }

  loadUserCards() {
    Object.keys(localStorage).forEach(k => {
      //load card icon on screen, ignore language and realm related entries at localStorage
      if (k != 'language' && k.includes("realm") == false && k.includes("token") == false) {
        let i = JSON.parse(localStorage.getItem(k));
        this.loadTypeCounts(i);
        this.totalPower += i.power;
        this.configureUserData(i);
      }
    });
    if (0 != this.userData.length) {
      this.loadSkillCounts()
    }
  }

  loadTypeCounts(card: any) {
    switch (card.type) {
      case 'LOGIC':
        this.typeCount[0] += 1;
        break;
      case 'EMPATHY':
        this.typeCount[1] += 1;
        break;
      case 'INTUITION':
        this.typeCount[2] += 1;
        break;
    };
    switch (card.charName) {
      case 'LUKE':
        this.charCount[0] += 1;
        break;
      case 'ARTEM':
        this.charCount[1] += 1;
        break;
      case 'VYN':
        this.charCount[2] += 1;
        break;
      case 'MARIUS':
        this.charCount[3] += 1;
        break;
    };
  }

  configureUserData(item: any) {
    let names = [];
    let ids = [];
    let slots = [];
    item.skillIDs.forEach(n => {
      this.allSkills.forEach(s => {
        if (n == s._id) {
          let name = s.name[this.lang] ?? s.name.zh;
          names.push(name);
          ids.push(s._id);
          slots.push(s.slot);
        }
      })
    });
    item.skillNames = names;
    item.sid = ids;
    item.skillSlots = slots;
    this.userData.push(item);
  }

  //load skill statistics for chosen cards
  loadSkillCounts() {
    this.userData.forEach(card => {
      //for special case of skill slot: card Entrapped
      for (let i = 0; i < card.sid.length; i++) {
        if (card.skillSlots[i] == 2) {
          this.loadSecondSkill(i, card);
        } else if (card.skillSlots[i] == 3) {
          this.loadThirdSkill(i, card);
        }
      }
    })
  }

  loadSecondSkill(index: number, card: any) {
    let common = "GENERAL";
    if (common === card.skillTypes[index] && common === card.skillChar[index]) {
      console.log(`${card.skillIDs[index]} is skipped`);
    } else {
      // skill buffing based on character
      let count = 1;
      if (common === card.skillTypes[index]) {
        switch (card.skillChar[index]) {
          case "LUKE":
            count = this.charCount[0];
            break;
          case "ARTEM":
            count = this.charCount[1];
            break;
          case "VYN":
            count = this.charCount[2];
            break;
          case "MARIUS":
            count = this.charCount[3];
            break;
        }
      }
      // skill buffing based on type
      else if (common === card.skillChar[index]) {
        switch (card.skillTypes[index]) {
          case "LOGIC":
            count = this.typeCount[0];
            break;
          case "EMPATHY":
            count = this.typeCount[1];
            break;
          case "INTUITION":
            count = this.typeCount[2];
            break;
        }
      }
      let isIn = false;
      this.secondSkills.forEach(skill => {
        if (skill._id == card.skillIDs[index]) {
          isIn = true;
        }
      });
      if (!isIn) {
        let skill = {
          _id: card.sid[index],
          ref: card.skillRefs[index],
          name: card.skillNames[index],
          num: Number(card.skillNums[index] * count).toFixed(2),
          numType: card.skillNumTypes[index]
        };
        this.secondSkills.push(skill);
      }
    }
  }

  loadThirdSkill(index: number, card: any){
    let isIn = false;
    this.thirdSkills.forEach(skill => {
      if (skill.id == card.skillIDs[index]) {
        skill.num += Number(card.skillNums[index]);
        isIn = true;
      }
    })
    if (!isIn) {
      let skill = {
        _id: card.sid[index],
        ref: card.skillRefs[index],
        name: card.skillNames[index],
        num: Number(card.skillNums[index]),
        numType: card.skillNumTypes[index]
      }
      this.thirdSkills.push(skill)
    }
  }

  addThirdSkill(userData: any, skillIndex: number) {
    let isIn = false;
    this.thirdSkills.forEach(skill => {
      if (skill.id == userData.skillIDs[skillIndex]) {
        skill.num += Number(userData.skillNums[skillIndex])
        isIn = true
      }
    })
    if (!isIn) {
      let skill = {
        _id: userData.sid[skillIndex],
        ref: userData.skillRefs[skillIndex],
        name: userData.skillNames[skillIndex],
        num: Number(userData.skillNums[skillIndex]),
        numType: userData.skillNumTypes[skillIndex]
      }
      this.thirdSkills.push(skill)
    }
  }

  clearAllSavedData() {
    this._data.clear()
    window.location.reload()
  }

}
