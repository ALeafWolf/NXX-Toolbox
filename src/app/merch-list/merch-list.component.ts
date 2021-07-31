import { Component, OnInit, HostListener } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GlobalVariable } from '../global-variable';

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

