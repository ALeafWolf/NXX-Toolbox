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
      id
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
        id
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
    // GraphQL
    // const query = GET_SKILL;
    // this._apollo.query({
    //   query,
    //   variables: {
    //     query: { _id: this._id }
    //   },
    // }).toPromise().then((result: any) => {
    //   this.configureSkillWithLang(result.data.skill);
    //   this.setTitle();
    //   this.getSkillStatistic();
    //   this.getCardsWithSkill();
    // }).catch(err => {
    //   console.log(err);
    //   this.isLoaded = true;
    // });

    // RESTful
    this._data.getSkill(this._id).toPromise().then((skill: any) => {
      this.configureSkillWithLang(skill);
      this.setTitle();
      this.getSkillStatistic();
      this.getCardsWithSkill();
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    });
  }

  configureSkillWithLang(skill: any) {
    this.skill = { ...skill };
    this.skill.n = this.skill.name[this.lang] ?? this.skill.name.zh;
    this.skill.des = this.skill.description[this.lang] ?? this.skill.description.zh;
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
    // GraphQL
    // this._apollo.query({
    //   query: GET_CARDS
    // }).toPromise().then((result: any) => {
    //   result.data.cards.forEach((card: any) => {
    //     card.skills.forEach(s => {
    //       if (s.id == this.skill.id) {
    //         this.cards.push(card);
    //       }
    //     })
    //   });
    //   this.isLoaded = true;
    // });

    this._data.getCards().toPromise().then((cards: any[]) => {
      cards.forEach((card: any) => {
        card.skillObj.forEach(s => {
          if (s.name.zh == this.skill.name.zh) {
            this.cards.push(card);
          }
        })
      });
      this.isLoaded = true;
    });
  }
}
