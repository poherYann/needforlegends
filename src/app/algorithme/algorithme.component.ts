import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-algorithme',
  templateUrl: './algorithme.component.html',
  styleUrls: ['./algorithme.component.css']
})
export class AlgorithmeComponent implements OnInit {

  private arrayMatchStat: any;
  private kills=0;
  private deaths=0;
  private assists=0;
  private numberMatch=0;
  private totalDamage=0;
  private win=0;
  private lose=0;
  private minion=0;
  private firstKill=0;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(value =>{

        this.arrayMatchStat=value;
        this.numberMatch=this.arrayMatchStat['data']['matchs'].length;

        for(let k=0;k<this.arrayMatchStat['data']['matchs'].length;k++){
          console.log(this.arrayMatchStat['data']['matchs'][k]);
          this.kills+=this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['kills'];
          this.deaths+=this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['deaths'];
          this.assists+=this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['assist'];
          this.totalDamage+=this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['totalDamageDealtToChampion'];

          if(this.arrayMatchStat['data']['matchs'][k]["user"][0]['userParticipant']['win']==="Fail"){
            this.win++;
          }else{
            this.lose++;
          }

          this.minion+=this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['totalMinionsKilled'];

          if(this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['firstBloodKill']===true){
            this.firstKill++;
          }

        }
        console.log("death/game "+ this.deaths/this.numberMatch);
        console.log("kills/game  "+this.kills/this.numberMatch);
        console.log("assist/game  "+this.assists/this.numberMatch);
        console.log("total/game  "+this.totalDamage/this.numberMatch);
        console.log("lose/game  "+this.lose);
        console.log("win/game  "+this.win);
        console.log("minion/game  "+this.minion/this.numberMatch);
        console.log("first blood/game  "+(this.firstKill/this.numberMatch)*100+"%");

      },
      (error)=>{
        console.log(error);

      });
  }

}
