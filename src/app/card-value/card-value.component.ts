import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data/data.service';
import { SkillInfo } from '../model/skill-info';

@Component({
  selector: 'app-card-value',
  templateUrl: './card-value.component.html',
  styleUrls: ['./card-value.component.scss']
})
export class CardValueComponent implements OnInit {
  //from route param
  char;
  id;

  //from data service
  charRssGroup;
  card;
  skillRssList;
  rss;

  //skill rss
  coin = 0;
  lv1Common = 0;
  lv1Specific = 0;
  lv2Common = 0;
  lv2Specific = 0;
  lv3Common = 0;
  lv3Specific = 0;

  //for localStorage
  userData;
  star = 1
  skills = [1, 1, 1]

  constructor(private _route: ActivatedRoute, private _data: DataService) {
    this.id = this._route.snapshot.params.id;
    this.char = this._route.snapshot.params.charname;
    this.charRssGroup = SkillInfo.getSkillRssGroup(this.char);
  }

  ngOnInit(): void {
    this._data.getCards().subscribe((data: any[]) =>{
      data.forEach(c => {
        if(c.id == this.id){
          this.card = c
        }
      });
    })
    this._data.getSkillRss().subscribe((data) =>{
      this.skillRssList = data;
    })

    this.userData = JSON.parse(this._data.getItem(this.id))

    //if localStorage has user's data for this card
    if(this.userData){
      this.skills = this.userData.skills
      this.calculateRss()
    }
  }

  calculateRss(){
    // let rss;
    switch(this.card.rank){
      case "SSR":
        this.rss = this.skillRssList.SSR;
      case "SR":
        this.rss = this.skillRssList.SR;
      case "MR":
        this.rss = this.skillRssList.SR;

    }
  }

}
