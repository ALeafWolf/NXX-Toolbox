import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SEOService } from '../services/seo/seo.service';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss']
})
export class SkillDetailComponent implements OnInit {

  lang;
  name;
  skill;
  skillName;
  skillDes;
  skillStatistic;
  cards;

  constructor(private _route: ActivatedRoute, private _data: DataService, private _seoService: SEOService) {
    this.name = this._route.snapshot.params.name;
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('language')
    this._data.getSkill(this.name).toPromise().then((data: any[]) => {
      this.skill = data
      this.setSkillInfoWithLang()
      this.skillStatistic = this.getSkillStatistic(this.skill)
      this.setTitle()
      this._data.getCards().toPromise().then((data: any[]) => {
        this.cards = this.getCardsWithSkill(data);
      })
    })
  }

  setTitle() {
    let pre = ''
    if ('CN' == this.lang) {
      pre = '技能'
    } else if ('EN' == this.lang) {
      pre = 'Skill'
    }
    this._seoService.setTitle(`${pre}：${this.skillName}`);
  }

  setSkillInfoWithLang() {
    if ('CN' == this.lang) {
      this.skillName = this.skill.name;
      this.skillDes = this.skill.description;
    } else if ('EN' == this.lang) {
      this.skillName = this.skill.nameEN == '' ? this.skill.name : this.skill.nameEN
      this.skillDes = this.skill.descriptionEN;
    }
  }

  //get statistics for skill in lv1-10
  getSkillStatistic(skill) {
    let a = [];
    let n = skill.nums
    a.push(n[0])
    for (let i = 1; i < 9; i++) {
      let num = i * (n[1] - n[0]) / 9 + n[0];
      a.push(num.toFixed(2))
    }
    a.push(skill.nums[1])
    return a;
  }

  //get card which has this skill
  getCardsWithSkill(data: any[]) {
    let a = [];
    data.forEach(card => {
      card.skills.forEach(skill => {
        if (skill == this.skill.name) {
          a.push(card);
        }
      });
    })
    return a;
  }
}
