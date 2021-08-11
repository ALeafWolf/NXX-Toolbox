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
        sellDate
        character
        series{
          name
          type
          sellTime
        }
      }
  }
`;

const GET_MERCH_SERIES = gql`
  query GetMerchSeries{
    merch_seriess(limit: 1000, sortBy: _ID_ASC){
      name
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
  allMerches: any[];
  //character, series, series type
  filterOptions = ['All', 'All', 'All'];
  allSeries = [];

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
      this.allMerches = result.data.merches;
      this.loadSeries();
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    })
  }

  loadSeries() {
    this._apollo.query({
      query: GET_MERCH_SERIES
    }).toPromise().then((result: any) => {
      this.allSeries = result.data.merch_seriess;
      this.isLoaded = true;
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    })
  }

  filterMerchs() {
    let arr = [];
    this.allMerches.forEach(merch => {
      //character
      let option = this.filterOptions[0];
      let charBool = (option == '夏彦' || option == '左然' || option == '莫弈' || option == '陆景和') && merch.character == 'All';
      // console.log(`${merch.name}: ${charBool}`)
      if (option == 'All' || option == merch.character || charBool) {
        //series
        option = this.filterOptions[1];
        if (option == 'All' || option == merch.series.name) {
          //sell time type
          option = this.filterOptions[2];
          if (option == 'All' || option == merch.series.type) {
            arr.push(merch);
          }
        }
      }
    });
    this.merches = arr;
  }

  resetFilters() {
    this.filterOptions = ['All', 'All', 'All'];
    this.filterMerchs();
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

