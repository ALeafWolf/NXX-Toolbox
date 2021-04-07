import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service/data.service';

@Component({
  selector: 'app-card-calculator',
  templateUrl: './card-calculator.component.html',
  styleUrls: ['./card-calculator.component.scss']
})
export class CardCalculatorComponent implements OnInit {
  userData = []
  totalPower = 0;
  constructor(private _data: DataService) {
    // this.userData = {...localStorage}
    Object.values(localStorage).forEach(item => {
      let i = JSON.parse(item)
      this.totalPower += i.power
      this.userData.push(i)
    })
  }

  ngOnInit(): void {
  }

  clearAllSavedData(){
    this._data.clear()
    window.location.reload()
  }

}
