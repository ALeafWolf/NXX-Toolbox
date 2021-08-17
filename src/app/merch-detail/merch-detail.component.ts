import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SEOService } from '../services/seo/seo.service';
import { Apollo, gql } from 'apollo-angular';
import { DataService } from '../services/data/data.service';

const GET_MERCH = gql`
  query GetMerch($query: MerchQueryInput!){
    merch(query: $query){
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
  selector: 'app-merch-detail',
  templateUrl: './merch-detail.component.html',
  styleUrls: ['./merch-detail.component.scss']
})
export class MerchDetailComponent implements OnInit {
  _id;
  lang;

  merch;
  isLoaded = false;

  @HostListener('window:scroll') onScroll(): void {
    this.setToTopButtonDisplay()
  }

  constructor(private _route: ActivatedRoute, private _apollo: Apollo, private _seoService: SEOService, private _data: DataService) { }

  ngOnInit(): void {
    this._id = this._route.snapshot.queryParamMap.get('id') as String;
    this.lang = localStorage.getItem('language');
    this.loadData();
  }

  loadData() {
    // this._apollo.query({
    //   query: GET_MERCH,
    //   variables: {
    //     query: { _id: this._id }
    //   },
    // }).toPromise().then((result: any) => {
    //   this.merch = result.data.merch;
    //   this.setTitle();
    //   this.isLoaded = true;
    // }).catch(err => {
    //   console.log(err);
    //   this.isLoaded = true;
    // })

    this._data.getMerch(this._id).toPromise().then((merch) => {
      this.merch = merch;
      this.setTitle();
      this.isLoaded = true;
    }).catch(err => {
      console.log(err);
      this.isLoaded = true;
    });
  }

  setTitle() {
    let pre = '周边';
    if ('en' == this.lang) {
      pre = 'Merch';
    } else if ('ko' == this.lang) {
      pre = '굿즈';
    }
    this._seoService.setTitle(`${pre}：${this.merch.name}`);
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
