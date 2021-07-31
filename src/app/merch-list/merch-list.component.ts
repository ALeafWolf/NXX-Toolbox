import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-merch-list',
  templateUrl: './merch-list.component.html',
  styleUrls: ['./merch-list.component.scss']
})
export class MerchListComponent implements OnInit {
  mihoyoCreative = ["https://weibo.com/u/6073483367", "https://bbs.mihoyo.com/wd/accountCenter/postList?id=50111872"]


  constructor(private _apollo: Apollo) { }

  ngOnInit(): void {
    this._apollo.watchQuery({
      query: gql`
        {
          merches(
            limit: 1000
          ) {
            hoyolab
            images
            name
            price
            productDescription
            productMaterial
            productPacking
            productSize
            productTechnology
            sellDate
            series{
              name
              type
              sellTime
            }
            tmall
            weibo
            }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      console.log(result);
    });
  }
}

