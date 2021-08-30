import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private link = "https://tot-data-api.herokuapp.com/api/"
  private testLink = "http://localhost:8080/api/"

  constructor(private _http: HttpClient) { }

  //load data from api
  getCards(){
    return this._http.get(this.link + "cards");
    // return this._http.get(this.testLink + "cards");
  }
  
  getCard(id: String){
    return this._http.get(this.link + `card/${id}`);
    // return this._http.get(this.testLink + `card/${id}`);
  }

  getSkills(){
    // return this._http.get(this.testLink + "skills");
    return this._http.get(this.link + "skills");
  }
  getSkill(id: String){
    // return this._http.get(this.testLink + `skill/${id}`);
    return this._http.get(this.link + `skill/${id}`);
  }

  getSkillRssList(){
    return this._http.get('assets/data/skill-level-up-rss.json');
  }

  getVisionHistory(){
    return this._http.get(this.link + "visionhistory");
    // return this._http.get(this.testLink + `visionhistory`);
  }

  getCardEvolveRss(){
    return this._http.get('assets/data/card-evolve-rss.json');
  }

  getCardExp(){
    return this._http.get('assets/data/card-exp.json');
  }

  getMerchs(){
    // return this._http.get(this.testLink + `merchs`);
    return this._http.get(this.link + `merchs`);
  }

  getMerch(id: string){
    // return this._http.get(this.testLink + `merch/${id}`);
    return this._http.get(this.link + `merch/${id}`);
  }

  getMerchSeries(){
    // return this._http.get(this.testLink + `merchseries`);
    return this._http.get(this.link + `merchseries`);
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
