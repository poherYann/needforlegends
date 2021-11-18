import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class MatchService {

  url="http://127.0.0.1:8000";

  constructor(private http: HttpClient,private router:Router) { }

  getMatch(summoner_name:string | null, token:string | null){

    let httpOption={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      })
    }
    return this.http.post(this.url+'/get/match/'+summoner_name,'',httpOption);
  }

  setMatch(email:string, token:string | null){
    let httpOption={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      })
    }
    this.http.post(this.url+'/api/match',{email:email},httpOption).subscribe(value=>console.log(value));
    this.router.navigate(['/search']);

  }

  getMatchStat( token:string | null){

    let httpOption={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      })
    }
    return this.http.post(this.url+'/api/get/matchStat','',httpOption);
  }

}
