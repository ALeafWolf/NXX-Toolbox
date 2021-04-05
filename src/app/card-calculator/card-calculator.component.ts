import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service/data.service';

@Component({
  selector: 'app-card-calculator',
  templateUrl: './card-calculator.component.html',
  styleUrls: ['./card-calculator.component.scss']
})
export class CardCalculatorComponent implements OnInit {
  userData = []
  constructor(private _data: DataService) {
    // this.userData = {...localStorage}
    Object.values(localStorage).forEach(item => {
      this.userData.push(JSON.parse(item))
    })
  }

  ngOnInit(): void {
  }

}
