import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-card-calculator',
  templateUrl: './card-calculator.component.html',
  styleUrls: ['./card-calculator.component.scss']
})
export class CardCalculatorComponent implements OnInit {
  userData = []
  emptyHolder;
  totalPower = 0;
  constructor(private _data: DataService) {
    // this.userData = {...localStorage}
    Object.values(localStorage).forEach(item => {
      let i = JSON.parse(item)
      this.totalPower += i.power
      this.userData.push(i)
    })
    this.generateEmptyHolder()
  }

  ngOnInit(): void {
  }

  generateEmptyHolder(){
    let userLength = this.userData.length
    this.emptyHolder = Array(15 - userLength).fill(0)
  }

  clearAllSavedData(){
    this._data.clear()
    window.location.reload()
  }

}
