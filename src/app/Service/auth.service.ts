import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();

    const token = localStorage.getItem('token');

    if(token==undefined ){
      return false;
    }

    // Check whether the token is expired and return
    // true or false
    // @ts-ignore
    return !jwtHelper.isTokenExpired(token);
  }}
