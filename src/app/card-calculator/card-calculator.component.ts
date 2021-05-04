import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-card-calculator',
  templateUrl: './card-calculator.component.html',
  styleUrls: ['./card-calculator.component.scss']
})
export class CardCalculatorComponent implements OnInit {
  userData = [];
  emptyHolder;
  totalPower = 0;
  secondSkills = [];
  thirdSkills = [];

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.loadUserCards()
    this.generateEmptyHolder()
  }

  generateEmptyHolder() {
    let userLength = this.userData.length
    this.emptyHolder = Array(15 - userLength).fill(0)
  }

  loadUserCards() {
    Object.keys(localStorage).forEach(k => {
      //load card icon on screen
      if (k != "language") {
        let i = JSON.parse(localStorage.getItem(k))
        this.totalPower += i.power
        this.userData.push(i)
      }
    })
    if(0 != this.userData.length){
      this.loadSkillCounts()
    }
  }

  //load skill statistics for chosen cards
  loadSkillCounts() {
    this.userData.forEach(data => {
      this.addSkill(data, this.secondSkills, 1)
      this.addSkill(data, this.thirdSkills, 2)
    })
  }

  addSkill(userData: any, skillList: any[], skillIndex: number){
    let isIn = false;
    skillList.forEach(skill => {
      if(skill.name == userData.skillNames[skillIndex]){
        skill.num += Number(userData.skillNums[skillIndex])
        isIn = true
      }
    })
    if(!isIn){
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
