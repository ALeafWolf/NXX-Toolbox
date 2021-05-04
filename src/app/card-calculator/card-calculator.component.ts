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

  loadSkillCounts() {
    // console.log(this.userData)
    this.userData.forEach(data => {
      let isIn = false;
      this.secondSkills.forEach(skill => {
        // console.log(`${skill.name} ${data.skillNames[1]}`)
        if(skill.name == data.skillNames[1]){
          console.log("yay")
          skill.num += Number(data.skillNums[1])
          isIn = true
        }
      })
      if(!isIn){
        console.log("Add new")
        this.addSkillPack(data, this.secondSkills, 1);
      }
    })
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
