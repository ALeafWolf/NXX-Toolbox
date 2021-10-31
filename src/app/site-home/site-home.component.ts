import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'home',
  templateUrl: './site-home.component.html',
  styleUrls: ['./site-home.component.scss']
})
export class HomeComponent implements OnInit {

  logs: any[];
  // isLoaded = false;

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    // this._data.getUpdateLog().toPromise().then((logs: any[]) => {
    //   this.logs = logs;
    // }).catch(err => {
    //   console.log(err);
    //   this.isLoaded = true;
    // });
  }

  generateRandomIcon(){
    let pre = 'assets/images/'
    let post = '.png'
    let arr = ['初代2', '夏彦', '左然', '莫弈', '陆景和']
    let i = Math.floor(Math.random() * 4);
    let a = '莫弈'
    return pre + a + post;
  }

}