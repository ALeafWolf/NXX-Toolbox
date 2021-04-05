import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  //load data from local json
  getCards(){
    return this._http.get('assets/data/cards.json');
  }
  getSkills(){
    return this._http.get('assets/data/skills.json');
  }
  getSkillRssList(){
    return this._http.get('assets/data/skill-level-up-rss.json');
  }
  // getSkillRss(rank: string[3]){
  //   return this._http.get('assets/data/skill-level-up-rss.json');
  // }

  //load data from locatStorage
  getItem(key: string){
    return localStorage.getItem(key)
  }
  setItem(key: string, value){
    localStorage.setItem(key, value)
  }
  removeItem(key: string){
    localStorage.removeItem(key)
  }
  clear(){
    localStorage.clear()
  }
}
