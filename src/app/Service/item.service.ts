import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  url="http://127.0.0.1:8000/items";


  constructor(private http: HttpClient,private router:Router) { }

  getItem():Observable<Object>{
    let httpOption={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(this.url,'',httpOption);
  }
}
