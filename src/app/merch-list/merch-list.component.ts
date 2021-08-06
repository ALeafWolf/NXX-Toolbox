import { Component, OnInit, HostListener } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_MERCHES = gql`
  query GetMerchs{
    merches(limit: 1000, sortBy: _ID_ASC) 
      {
        _id
        images
        name
        price
        productSize
        productMaterial
        productTechnology
        productPacking
        productDescription
        sellDate
        series{
          name
          type
          sellTime
        }
        tmall
        weibo
        hoyolab
      }
  }
`;

@Component({
  selector: 'app-merch-list',
  templateUrl: './merch-list.component.html',
  styleUrls: ['./merch-list.component.scss']
})

export class MerchListComponent implements OnInit {
  mihoyoCreative = ["https://weibo.com/u/6073483367", "https://bbs.mihoyo.com/wd/accountCenter/postList?id=50111872"]
  isLoaded = false;
  merches: any[];

  @HostListener('window:scroll') onScroll(): void {
    this.setToTopButtonDisplay()
  }

  constructor(private _apollo: Apollo) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._apollo.query({
      query: GET_MERCHES
    }).toPromise().then((result: any) => {
        this.merches = result.data.merches;
        this.isLoaded = true;
      });
  }

  //button to top
  setToTopButtonDisplay() {
    let btn = document.getElementById('toTopButton');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  }

  toTopOfScreen() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

