import { Component, OnInit } from '@angular/core';
import {LogoutService} from "../Service/logout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logoutService:LogoutService,private router: Router) { }

  ngOnInit(): void {
   this.logoutService.logout();
    this.router.navigate(["search"]);

  }

}
