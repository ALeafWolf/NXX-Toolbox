import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {
  
  skillList;

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.getSkills().subscribe((data) =>{
      this.skillList = data;
    })
  }

}
