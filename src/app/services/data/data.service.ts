import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private link = "https://tears-of-themis-api.herokuapp.com/api/"
  private testLink = "http://localhost:8080/api/"

  constructor(private _http: HttpClient) { }

  //load data from api
  getCards(){
    // return this._http.get('assets/data/cards.json');
    return this._http.get(this.link + "cards");
    // return this._http.get(this.testLink + "cards");
  }
  
  getCard(name: String){
    return this._http.get(this.link + `card/${name}`);
    // return this._http.get(this.testLink + `card/${name}`);
  }

  getSkills(){
    // return this._http.get('assets/data/skills.json');
    // return this._http.get(this.testLink + "skills");
    return this._http.get(this.link + "skills");
  }
  getSkill(name: String){
    // return this._http.get('assets/data/skills.json');
    // return this._http.get(this.testLink + `skill/${name}`);
    return this._http.get(this.link + `skill/${name}`);
  }

  getSkillRssList(){
    // return this._http.get('assets/data/skill-level-up-rss.json');
    return this._http.get(this.link + "skillrss");
    // return this._http.get(this.testLink + "skillrss");
  }

  getVisionHistory(){
    // return this._http.get('assets/data/card-pool-history.json');
    return this._http.get(this.link + "visionhistory");
    // return this._http.get(this.testLink + `visionhistory`);
  }

  getVisionHistoryForOneServer(server:string){
    return this._http.get(this.link + `visionhistory/${server}`);
  }

  getCardEvolveRss(){
    return this._http.get('assets/data/card-evolve-rss.json');
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
