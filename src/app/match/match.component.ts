import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatchService} from "../service/match.service";
import {GetSummonerResolver} from "../Service/resolver.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  public arrayMatches: any;
  public arrayChampions:any;
  public arrayItems:any;
  public arraySummoners:any;
  public test=true;

  constructor(private route: ActivatedRoute,private matchService:MatchService) {

  }

  ngOnInit(): void {

    this.route.data.subscribe(value =>{
        this.arrayChampions=value.GetChampionResolver;
        this.arrayItems=value.GetItemResolver;
        this.arrayMatches=value.data;
        this.arraySummoners=value.GetSummonerResolver;
        console.log( this.arrayItems);
        console.log( this.arrayMatches);
        console.log( this.arrayChampions);
        console.log( this.arraySummoners);

      },
      (error)=>{
        console.log(error);

      });
  }

  ngAfterViewInit():void{
    this.test=false;

  }

}
