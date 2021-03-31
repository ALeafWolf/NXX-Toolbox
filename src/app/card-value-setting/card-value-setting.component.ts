import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-card-value-setting',
  templateUrl: './card-value-setting.component.html',
  styleUrls: ['./card-value-setting.component.scss']
})
export class CardValueSettingComponent implements OnInit {

  charName: String;
  cardName: String;

  constructor(private _route: ActivatedRoute) {
    this.charName = this._route.snapshot.params.charname
    this.cardName = this._route.snapshot.params.cardname

  }

  ngOnInit(): void {
  }

}
