import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SEOService } from '../services/seo/seo.service';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

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
  name;
  lang;

  merch;
  isLoaded = false;

  constructor(private _route: ActivatedRoute, private _apollo: Apollo, private _seoService: SEOService) { }

  ngOnInit(): void {
    this.name = this._route.snapshot.params.name;
    this.lang = localStorage.getItem('language');
    this.loadData();
    this.setTitle();
  }

  loadData() {
    return this._apollo.query({
      query: GET_MERCH,
      variables: {
        query: {name: this.name}
      },
    }).toPromise().then((result: any) => {
      this.merch = result.data.merch;
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
    this._seoService.setTitle(`${pre}：${this.name}`);
  }
}
