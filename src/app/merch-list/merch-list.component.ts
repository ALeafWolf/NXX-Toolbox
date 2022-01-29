import { Component, OnInit, HostListener } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DataService } from '../services/data/data.service';

// const GET_MERCHES = gql`
//   query GetMerchs{
//     merches(limit: 1000, sortBy: _ID_ASC) 
//       {
//         _id
//         images
//         name
//         price
//         sellDate
//         character
//         series{
//           name
//           type
//           sellTime
//         }
//       }
//   }
// `;

// const GET_MERCH_SERIES = gql`
//   query GetMerchSeries{
//     merch_seriess(limit: 1000, sortBy: _ID_ASC){
//       name
//     }
//   }
// `;

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

  constructor(private _apollo: Apollo, private _data: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // GraphQL
    // this._apollo.query({
    //   query: GET_MERCHES
    // }).toPromise().then((result: any) => {
    //   this.merches = result.data.merches;
    //   this.allMerches = result.data.merches;
    //   this.loadSeries();
    // }).catch(err => {
    //   console.log(err);
    //   this.isLoaded = true;
    // });

    // RESTful
    this._data.getMerchs().toPromise().then((merchs: any[]) => {
      this.merches = merchs;
      this.allMerches = merchs;
      this.loadSeries();
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    });
  }

  loadSeries() {
    // this._apollo.query({
    //   query: GET_MERCH_SERIES
    // }).toPromise().then((result: any) => {
    //   this.allSeries = result.data.merch_seriess;
    //   this.isLoaded = true;
    // }).catch(err => {
    //   console.log(err);
    //   this.isLoaded = true;
    // });

    this._data.getMerchSeries().toPromise().then((series: any[]) => {
      this.allSeries = series;
      this.isLoaded = true;
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    });
  }

  filterMerchs() {
    let arr = [];
    this.allMerches.forEach(merch => {
      //character
      let option = this.filterOptions[0];
      let charBool = (option == 'LUKE' || option == 'ARTEM' || option == 'VYN' || option == 'MARIUS') && merch.character == 'All';
      // console.log(`${merch.name}: ${charBool}`)
      if (option == 'All' || option == merch.character || charBool) {
        //series
        option = this.filterOptions[1];
        // if (option == 'All' || option == merch.series.name) {
        if (option == 'All' || option == merch.seriesObj.name) {
          //sell time type
          option = this.filterOptions[2];
          if (merch.seriesObj.type == "MIXED") {
            merch.sellDate.forEach(index => {
              let time = merch.seriesObj.sellTime[index];
              if (time.includes('~') && (option == 'LIMITED-TIME' || option == 'All')) {
                arr.push(merch);
              } else if (!time.includes('~') && (option == 'PERMANENT' || option == 'All')) {
                arr.push(merch);
              }
            });
          } else if (option == 'All' || option == merch.seriesObj.type) {
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

