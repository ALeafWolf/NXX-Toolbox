import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service/data.service';

@Component({
  selector: 'home',
  templateUrl: './site-home.component.html',
  styleUrls: ['./site-home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _data: DataService) { }

  ngOnInit(): void {
  }

}
