import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {GetuserService} from "./getuser.service";
import {MatchService} from "./match.service";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://127.0.0.1:8000/api/login_check";

  httpOption={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }

  constructor(private http: HttpClient,private userService:GetuserService,private matchService:MatchService,private toaster:ToastrService) { }

  loginUser(json: any):void{
    this.http.post<any>(this.url, json, this.httpOption).subscribe(value => {
      localStorage.setItem("token",value.token);
      localStorage.setItem('refresh_token',value.refresh_token);
      this.userService.getUser(json.username,localStorage.getItem('token'));
      this.matchService.setMatch(json.username,localStorage.getItem('token'));
      this.toaster.success("You have been connected !");
      window.location.reload()
    });
  }
}
