import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { GlobalVariable } from '../global-variable';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {

  lang;
  fullSkillList: any[];
  skillList: any[];
  filterConditions = ["All", "All", "All", "All", "All"]
  isLoaded = false;
  imgURL = GlobalVariable.imgURL;

  @HostListener('window:scroll') onScroll(): void {
    this.setToTopButtonDisplay()
  }

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('language')
    this._data.getSkills().toPromise().then((data: any[]) => {
      this.loadSkillWithLang(data)
      this.isLoaded = true;
    })
  }

  loadSkillWithLang(skills:any[]){
    let s = []
    skills.forEach(skill => {
      let n, des;
      if('en' == this.lang || 'ko' == this.lang){
        n = skill.nameEN != '' ? skill.nameEN : skill.name
        des = skill.descriptionEN != '' ? skill.descriptionEN : skill.description
      }else{
        n = skill.name
        des = skill.description
      }
      skill.name = n;
      skill.description = des
      s.push(skill)
    })
    this.fullSkillList = s;
    this.skillList = s;
  }

  setToTopButtonDisplay() {
    let btn = document.getElementById('toTopButton');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  }

  toTopOfScreen() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  filterSkillList() {
    let tempListHolder = this.fullSkillList
    let finalListHolder = []

    //character name filter
    tempListHolder.forEach(skill => {
      let condition = this.filterConditions[0]
      if (condition == "All") {
        finalListHolder.push(skill)
      } else if (skill.character == condition) {
        finalListHolder.push(skill)
      }
    })
    tempListHolder = finalListHolder
    finalListHolder = []

    //rarity filter
    // tempListHolder.forEach(skill => {
    //   let condition = this.filterConditions[1]
    //   console.log(`${skill.rarity.includes(condition)}`)
    //   if (condition == "All") {
    //     finalListHolder.push(skill)
    //   } else if (skill.rarity.includes(condition)) {
    //     finalListHolder.push(skill)
    //   }
    // })
    // tempListHolder = finalListHolder
    // finalListHolder = []

    //type filter
    tempListHolder.forEach(skill => {
      let condition = this.filterConditions[2]
      if (condition == "All") {
        finalListHolder.push(skill)
      } else if (skill.type.includes(condition)) {
        finalListHolder.push(skill)
      }
    })
    tempListHolder = finalListHolder
    finalListHolder = []

    //function filter
    tempListHolder.forEach(skill => {
      let condition = this.filterConditions[3]
      if (condition == "All") {
        finalListHolder.push(skill)
      } else if (skill.function.includes(condition)) {
        finalListHolder.push(skill)
      }
    })
    tempListHolder = finalListHolder
    finalListHolder = []

    //skill slot filter
    tempListHolder.forEach(skill => {
      let condition = this.filterConditions[4]
      if (condition == "All") {
        finalListHolder.push(skill)
      } else if (skill.slot == condition) {
        finalListHolder.push(skill)
      }
    })
    this.skillList = finalListHolder;
  }

  resetFilters() {
    this.filterConditions = ["All", "All", "All", "All", "All"];
    this.filterSkillList()
  }
}
