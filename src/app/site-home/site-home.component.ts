import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { GlobalVariable } from '../global-variable';

@Component({
  selector: 'home',
  templateUrl: './site-home.component.html',
  styleUrls: ['./site-home.component.scss']
})
export class HomeComponent implements OnInit {

  items: any;
  isLoaded = false;
  imgURL = GlobalVariable.imgURL;

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.getUpdateItems().toPromise().then((items: any[]) => {
      this.items = items[0];
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    });
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
