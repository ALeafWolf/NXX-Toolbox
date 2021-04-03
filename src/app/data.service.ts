import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  getCards(){
    return this._http.get('assets/data/cards.json');
  }

  getSkills(){
    return this._http.get('assets/data/skills.json');
  }

}
