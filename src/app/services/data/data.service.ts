import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private link = "https://tears-of-themis-api.herokuapp.com/api/"

  constructor(private _http: HttpClient) { }

  //load data from api
  getCards(){
    // return this._http.get('assets/data/cards.json');
    return this._http.get(this.link + "cn/cards");
  }
  getCard(name: String){
    return this._http.get(this.link + `cn/card/${name}`);
  }
  getSkills(){
    // return this._http.get('assets/data/skills.json');
    return this._http.get(this.link + "cn/skills");
  }
  getSkill(name: String){
    // return this._http.get('assets/data/skills.json');
    return this._http.get(this.link + `cn/skill/${name}`);
  }
  getSkillRssList(){
    // return this._http.get('assets/data/skill-level-up-rss.json');
    return this._http.get(this.link + "skillrss");
  }
  getCardPoolHistory(){
    // return this._http.get('assets/data/card-pool-history.json');
    return this._http.get(this.link + "cn/poolhistory");
  }

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
