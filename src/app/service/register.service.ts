import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { register } from "../register";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url="http://127.0.0.1:8000/api/register";

  httpOption={
    headers: new HttpHeaders()
  }

  constructor(private http: HttpClient) { }

  addUser(json: any):void{
    this.http.post<any>(this.url, json, this.httpOption).subscribe();
  }
}
