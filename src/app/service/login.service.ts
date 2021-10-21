import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from "../login";
import {GetuserService} from "./getuser.service";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://127.0.0.1:8000/api/login_check";

  httpOption={
    headers: new HttpHeaders()
  }

  constructor(private http: HttpClient,private userService:GetuserService) { }

  loginUser(json: any):void{

    this.http.post<any>(this.url, json, this.httpOption).subscribe(value => {
      localStorage.setItem("token",value.token);
      localStorage.setItem('refresh_token',value.refresh_token);
      this.userService.getUser(json.username,value.token);
    });
  }
}
