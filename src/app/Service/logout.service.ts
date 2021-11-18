import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router:Router,private toaster:ToastrService) { }


  logout(){
    localStorage.clear();
    this.toaster.success("You have been disconnected !");
  }

}
