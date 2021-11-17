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
  private baronKill=0;
  private goldEarned=0;
  private firstTowerKill=0;
  private scoreUser=[];
  private arrayAggressive=[];
  private arrayObjective=[];
  private arrayPassive=[];


  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(value =>{

        this.arrayMatchStat=value;

        for(let k=1;k<this.arrayMatchStat['data']['matchs'].length;k++){

          if(this.arrayMatchStat['data']['matchs'][k]['summoner'][0][0]==this.arrayMatchStat['data']['matchs'][k-1]['summoner'][0][0]) {
            this.numberMatch=this.arrayMatchStat['data']['matchs'].length;

            this.kills += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['kills'];
            this.deaths += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['deaths'];
            this.assists += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['assist'];
            this.totalDamage += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['totalDamageDealtToChampion'];
            this.baronKill += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userParticipant']['baronKills'];
            this.goldEarned += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['goldEarned'];

            if (this.arrayMatchStat['data']['matchs'][k]["user"][0]['userParticipant']['win'] === "Fail") {
              this.win++;
            } else {
              this.lose++;
            }

            this.minion += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['totalMinionsKilled'];

            if (this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['firstBloodKill'] === true) {
              this.firstKill++;
            }
            if (this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['firstTowerKill'] === true) {
              this.firstTowerKill++;
            }

          }
          if(k==this.arrayMatchStat['data']['matchs'].length-1 || this.arrayMatchStat['data']['matchs'][k]['summoner'][0][0]!=this.arrayMatchStat['data']['matchs'][k-1]['summoner'][0][0]){

            let array={"summoner":this.arrayMatchStat['data']['matchs'][k-1]['summoner'][0][0],"data":[(this.kills+this.assists)/this.numberMatch,(this.firstKill/this.numberMatch)*100,this.totalDamage/this.numberMatch,
            this.goldEarned/this.numberMatch,(this.firstTowerKill/this.numberMatch)*100,this.arrayMatchStat['data']['matchs'][k-1]['summoner'][0][0]]};
            this.resetValue();
            // @ts-ignore
            this.scoreUser.push(array);
          }
        }
        console.log(this.scoreUser);
        this.AggressiveScore(this.scoreUser);

      },
      (error)=>{
        console.log(error);

      });

  }

  AggressiveScore(valueArray:any){

    for (let j=0;j<valueArray.length-1;j++) {
      // @ts-ignore
      let swap = true;

      while (swap) {
        swap = false;
        for (let i = 0; i < this.scoreUser.length - 1; i++) {
          // @ts-ignore
          for (let v=0;v<this.scoreUser[i]['data'].length;v++) {

            if (this.scoreUser[i]['data'][v] > this.scoreUser[i + 1]['data'][v]) {
              let item = this.scoreUser[i]['data'][v];
              this.scoreUser[i]['data'][v] = this.scoreUser[i + 1]['data'][v];
              this.scoreUser[i + 1]['data'][v] = item;
              swap = true;
            }
          }
        }
      }
      this.setScore();
    }
  }

  setScore(){


    /*if(this.arrayAggressive[0]==null) {
      for (let u = 0; u < this.scoreUser.length; u++) {
        // @ts-ignore
        this.arrayAggressive.push({"summoner": this.scoreUser[u]['summoner'], "score": u});
      }
    }*/
  }

  resetValue(){

    this.kills=0;
    this.deaths=0;
    this.assists=0;
    this.numberMatch=0;
    this.totalDamage=0;
    this.win=0;
    this.lose=0;
    this.minion=0;
    this.firstKill=0;
    this.baronKill=0;
    this.goldEarned=0;
    this.firstTowerKill=0;

  }

}
