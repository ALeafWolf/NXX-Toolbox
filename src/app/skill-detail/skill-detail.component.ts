import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss']
})
export class SkillDetailComponent implements OnInit {

  name;
  skill;
  skillStatistic;
  cards;

  constructor(private _route: ActivatedRoute, private _data: DataService) {
    this.name = this._route.snapshot.params.name;
  }

  ngOnInit(): void {
    this._data.getCards().toPromise().then((data: any[]) => {
      this.cards = this.getCardsWithSkill(data);
    })
    this._data.getSkill(this.name).toPromise().then((data: any[]) => {
      this.skill = data[0]
      this.skillStatistic = this.getSkillStatistic(this.skill)
    })
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
        if (skill == this.name) {
          a.push(card);
        }
      });
    })
    return a;
  }
}
