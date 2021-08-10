import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SEOService } from '../services/seo/seo.service';
import { DataService } from '../services/data/data.service';
import { GlobalVariable } from '../global-variable';
import { Apollo, gql } from 'apollo-angular';

const GET_SKILL = gql`
  query GetSkill($query: SkillQueryInput){
    skill(query: $query){
      ref
      name
      nums
      description
    }
  }
`;

const GET_SKILL_EN = gql`
  query GetSkill($query: SkillQueryInput){
    skill(query: $query){
      ref
      name
      nameEN
      nums
      descriptionEN
    }
  }
`;

const GET_CARDS = gql`
  query GetCards{
    cards(limit: 1000, sortBy: _ID_ASC){
      _id
      id
      character
      skills
      {
        name
      }
    }
  }
`;

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss']
})
export class SkillDetailComponent implements OnInit {

  lang;
  _id;
  name;
  skill;
  skillName;
  skillDes;
  skillStatistic = [];
  cards = [];

  imgURL = GlobalVariable.imgURL;
  isLoaded = false;

  constructor(private _route: ActivatedRoute, private _data: DataService, private _apollo: Apollo, private _seoService: SEOService) {
    this.name = this._route.snapshot.params.name;
  }

  ngOnInit(): void {
    this._id = this._route.snapshot.queryParamMap.get('id') as String;
    this.lang = localStorage.getItem('language');
    this.loadData();
  }

  loadData() {
    let query;
    if (this.lang == 'zh') {
      query = GET_SKILL;
    } else {
      query = GET_SKILL_EN;
    }
    this._apollo.query({
      query,
      variables: {
        query: { _id: this._id }
      },
    }).toPromise().then((result: any) => {
      this.configureSkillWithLang(result.data.skill);
      this.setTitle();
      this.getSkillStatistic();
      this.getCardsWithSkill();
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    })
  }

  configureSkillWithLang(skill: any) {
    this.skill = { ...skill };
    if ('zh' == this.lang) {
      this.skill.n = this.skill.name;
      this.skill.des = this.skill.description;
    } else {
      this.skill.n = this.skill.nameEN;
      this.skill.des = this.skill.descriptionEN;
    }
  }

  setTitle() {
    let pre = ''
    if ('zh' == this.lang) {
      pre = '技能'
    } else if ('en' == this.lang) {
      pre = 'Skill'
    } else if ('ko' == this.lang) {
      pre = '스킬'
    }
    this._seoService.setTitle(`${pre}：${this.skill.n}`);
  }

  //get statistics for skill in lv1-10
  getSkillStatistic() {
    let a = [];
    let n = this.skill.nums;
    a.push(n[0]);
    for (let i = 1; i < 9; i++) {
      let num = i * (n[1] - n[0]) / 9 + n[0];
      a.push(num.toFixed(2));
    }
    a.push(this.skill.nums[1]);
    this.skillStatistic = a;
  }

  //get card which has this skill
  getCardsWithSkill() {
    this._apollo.query({
      query: GET_CARDS
    }).toPromise().then((result: any) => {
      result.data.cards.forEach((card: any) => {
        card.skills.forEach(s => {
          if(s.name == this.skill.name){
            this.cards.push(card);
          }
        })
      });
      this.isLoaded = true;
    }).catch(err => { console.log(err) });
  }
}
