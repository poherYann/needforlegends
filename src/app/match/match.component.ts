import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatchService} from "../service/match.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  private arrayMatches: any;

  constructor(private route: ActivatedRoute,private matchService:MatchService) {

  }

  ngOnInit(): void {

    let str =this.route.snapshot.paramMap.get('summoner_name');
    let token = localStorage.getItem('token');
    if (str != null && token!=null) {
      let matchValue= this.matchService.getMatch(str,token);
      // @ts-ignore
      matchValue.toPromise().then(value =>{console.log(value)});

    }

  }

}
