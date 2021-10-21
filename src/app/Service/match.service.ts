import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class MatchService {

  url="http://127.0.0.1:8000";

  httpOption={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
  }

  constructor(private http: HttpClient) { }

  getMatch(summoner_name:string){

   return this.http.post(this.url+'/api/get/match/'+summoner_name,'',this.httpOption);
  }

  setMatch(summoner_name:string){

     this.http.post(this.url+'/api/match/'+summoner_name,'',this.httpOption);
  }

}
