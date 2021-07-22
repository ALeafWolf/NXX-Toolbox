import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merch-list',
  templateUrl: './merch-list.component.html',
  styleUrls: ['./merch-list.component.scss']
})
export class MerchListComponent implements OnInit {

  mihoyoCreative = ["https://weibo.com/u/6073483367", "https://bbs.mihoyo.com/wd/accountCenter/postList?id=50111872"]

  constructor() { }

  ngOnInit(): void {
  }

}
