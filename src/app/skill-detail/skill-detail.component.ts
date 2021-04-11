import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data-service/data.service';

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
    this._data.getCards().subscribe((data: any[]) => {
      this.cards = this.getCardsWithSkill(data);
    })
    this._data.getSkills().subscribe((data: any[]) =>{
      data.forEach(skill => {
        if(skill.name == this.name){
          this.skill = skill
          this.skillStatistic = this.getSkillStatistic(this.skill)
        }
      })
    })
  }

  getMatchingSkills(data:any[]){
    let a = []
    data.forEach(skill => {
      if(skill.name == this.name){
        a.push(skill)
      }
    })
    return a
  }

  getSkillStatistic(skill){
    let a = [];
    let n = skill.nums
    a.push(n[0])
    for(let i = 1; i < 9; i++){
      let num = i * (n[1] - n[0]) / 9 + n[0];
      a.push(num.toFixed(2))
    }
    a.push(skill.nums[1])
    return a;
  }

  getCardsWithSkill(data: any[]){
    let a = [];
    data.forEach(card => {
      card.skills.forEach(skill => {
        if(skill == this.name){
          a.push(card);
        }
      });
    })
    return a;
  }
}
