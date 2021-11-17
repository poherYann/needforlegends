import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Register} from "../register";
import {Algo} from "../algo";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-algorithme',
  templateUrl: './algorithme.component.html',
  styleUrls: ['./algorithme.component.css']
})
export class AlgorithmeComponent implements OnInit {

  algoForm = this.fb.group({
    agressive:["", [],],
    objective:["", []],
    safe:["", []],
    agressivePlayer:["", []],
    objectivePlayer:["", []], // letter num et car spécial
    safePlayer:["", []], // letter num et car spécial],
  });

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
  private arrayAggressive:any;
  private arrayObjective:any;
  private arrayPassive:any;
  private dragonKills=0;
  private turretKills=0;
  private inhibKills=0;
  private scoreVision=0;
  private totalDamageTaken=0;
  private role:any;

  constructor(private route:ActivatedRoute,private fb:FormBuilder,private toaster:ToastrService) { }

  ngOnInit(): void {

    this.route.data.subscribe(value =>{


        this.arrayMatchStat=value;
        let array=[];

        console.log(this.arrayMatchStat);
        for(let k=1;k<this.arrayMatchStat['data']['matchs'].length;k++) {

          if (this.arrayMatchStat['data']['matchs'][k]['summoner'][0][0] == this.arrayMatchStat['data']['matchs'][k - 1]['summoner'][0][0]) {
            //on additionne pour un user toutes les différentes stats qui nous intéresse on fera une moyenne par game de chaque stats afin de determiner un score de performance
            this.numberMatch++;
            this.kills += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['kills'];
            this.deaths += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['deaths'];
            this.assists += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['assist'];
            this.totalDamage += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['totalDamageDealtToChampion'];
            this.baronKill += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userParticipant']['baronKills'];
            this.goldEarned += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['goldEarned'];
            this.dragonKills += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userParticipant']['dragonKills'];
            this.turretKills += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['turretKills'];
            this.inhibKills += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['inhibKills'];
            this.totalDamageTaken += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['totalDamageTaken'];
            this.role = this.arrayMatchStat['data']['matchs'][k]["user"][0]['roleMustPlayed'];
            this.scoreVision += this.arrayMatchStat['data']['matchs'][k]["user"][0]['userStat']['visionScore'];

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

          if (k == this.arrayMatchStat['data']['matchs'].length - 1 ||
            this.arrayMatchStat['data']['matchs'][k]['summoner'][0][0] != this.arrayMatchStat['data']['matchs'][k - 1]['summoner'][0][0]) {

            let objectData = {//Statistique par game
              "data": {
                "ka": ((this.kills + this.assists) / this.numberMatch).toFixed(2),
                "firstKill": ((this.firstKill / this.numberMatch) * 100).toFixed(2),
                "damage": (this.totalDamage / this.numberMatch).toFixed(2),
                "goldEarned": (this.goldEarned / this.numberMatch).toFixed(2),
                "firstTowerKill": ((this.firstTowerKill / this.numberMatch) * 100).toFixed(2),
                "baronKill": (this.baronKill / this.numberMatch).toFixed(2),
                "dragonKills": (this.dragonKills / this.numberMatch).toFixed(2),
                "minion": (this.minion / this.numberMatch).toFixed(2),
                "turretKills": (this.turretKills / this.numberMatch).toFixed(2),
                "inhibKills": (this.inhibKills / this.numberMatch).toFixed(2),
                "totalDamageTaken": (this.totalDamageTaken / this.numberMatch).toFixed(2),
                "role":this.role,
                "scoreVision": (this.scoreVision / this.numberMatch).toFixed(2),
                "deaths": (this.deaths / this.numberMatch).toFixed(2),
                "summoner": this.arrayMatchStat['data']['matchs'][k - 1]['summoner'][0][0]
              }
            };

            this.resetValue();
            // @ts-ignore
            this.scoreUser.push(objectData);
          }
        }

        console.log(this.scoreUser);

        this.Score(this.scoreUser);

      },
      (error)=>{
        console.log(error);

      });

  }

  Score(valueArray:any){// on va attribuer un score Aggressive selon 5 critères

    let TypeOfPlayer=["aggressive","safe","objective"];

    for (let m=0;m<TypeOfPlayer.length;m++) {

      let arrayResult=[];
      let result;

        if (TypeOfPlayer[m] === "aggressive") {

          for (let i = 0; i < valueArray.length; i++) {

            let dataDamage = valueArray[i]['data']["damage"];//critère 1
            let dataFirstKill = valueArray[i]['data']["firstKill"];//critère 2
            let dataFirstTowerKill = valueArray[i]['data']["firstTowerKill"];//critère 3
            let dataGoldEarned = valueArray[i]['data']["goldEarned"];//critère 4
            let dataKa = valueArray[i]['data']["ka"];//critère 5...
            let score = 0;
            let arrayStatsType = ["damage", "firstKill", "firstTowerKill", "goldEarned", "ka"];

            for (let n = 0; n < arrayStatsType.length; n++) {//on boucle sur tout les baremes aggressive que l'on a choisis dans arrayStatsType

              switch (arrayStatsType[n]) {//chaque critère à son barème de score
                case "damage":
                  score = this.ApplyScoreDependingValueType("damage", dataDamage, score);
                  break;
                case "firstKill":
                  score = this.ApplyScoreDependingValueType("firstKill", dataFirstKill, score);
                  break;
                case "firstTowerKill":
                  score = this.ApplyScoreDependingValueType("firstTowerKill", dataFirstTowerKill, score);
                  break;
                case "goldEarned":
                  score = this.ApplyScoreDependingValueType("goldEarned", dataGoldEarned, score);
                  break;
                case "ka":
                  score = this.ApplyScoreDependingValueType("ka", dataKa, score);
                  break;
              }


            }
            result = {"summoner": valueArray[i]['data']["summoner"], "score": score};
            arrayResult.push(result);//on enregistre le score et le summoner dans un tableau qui nous servira à sortir les joueurs les plus aggressives
          }
          this.arrayAggressive = arrayResult;
          console.log(this.arrayAggressive);
        } else if (TypeOfPlayer[m] === "safe") {

          for (let i = 0; i < valueArray.length; i++) {

            let dataBaronKill = valueArray[i]['data']["baronKill"];
            let dataDragonKills = valueArray[i]['data']["dragonKills"];
            let dataInhibKills = valueArray[i]['data']["inhibKills"];
            let dataTurretKills = valueArray[i]['data']["turretKills"];
            let dataFirstTowerKill = valueArray[i]['data']["firstTowerKill"];//critère 3

            let dataMinion = valueArray[i]['data']["minion"];
            let dataVisionScore = valueArray[i]['data']["visionScore"];
            let dataTotalDamageTaken = valueArray[i]['data']["totalDamageTaken"];
            let dataDeaths = valueArray[i]['data']["deaths"];

            let scoreobj = 0;
            let arrayStatsType = ["baronKill", "dragonKill", "turretKill", "inhibKill", "firstTowerKill"];

            for (let n = 0; n < arrayStatsType.length; n++) {//on boucle sur tout les baremes aggressive que l'on a choisis dans arrayStatsType

              switch (arrayStatsType[n]) {//chaque critère à son barème de score
                case "damage":
                  scoreobj = this.ApplyScoreDependingValueType("baronKill", dataBaronKill, scoreobj);
                  break;
                case "firstKill":
                  scoreobj = this.ApplyScoreDependingValueType("dragonKill", dataDragonKills, scoreobj);
                  break;
                case "firstTowerKill":
                  scoreobj = this.ApplyScoreDependingValueType("firstTowerKill", dataFirstTowerKill, scoreobj);
                  break;
                case "goldEarned":
                  scoreobj = this.ApplyScoreDependingValueType("turretKill", dataTurretKills, scoreobj);
                  break;
                case "ka":
                  scoreobj = this.ApplyScoreDependingValueType("inhibKill", dataInhibKills, scoreobj);
                  break;
              }

            }
            result = {"summoner": valueArray[i]['data']["summoner"], "scoreObjective": scoreobj};
            arrayResult.push(result);
          }
          this.arrayObjective = arrayResult;
          console.log(this.arrayObjective);

        } else if (TypeOfPlayer[m] === "objective") {
          for (let i = 0; i < valueArray.length; i++) {

            let dataBaronKill = valueArray[i]['data']["baronKill"];
            let dataDragonKills = valueArray[i]['data']["dragonKills"];
            let dataInhibKills = valueArray[i]['data']["inhibKills"];
            let dataTurretKills = valueArray[i]['data']["turretKills"];
            let dataFirstTowerKill = valueArray[i]['data']["firstTowerKill"];//critère 3

            let dataMinion = valueArray[i]['data']["minion"];
            let dataVisionScore = valueArray[i]['data']["visionScore"];
            let dataTotalDamageTaken = valueArray[i]['data']["totalDamageTaken"];
            let dataDeaths = valueArray[i]['data']["deaths"];

            let scoreobj = 0;
            let arrayStatsType = ["baronKill", "dragonKill", "turretKill", "inhibKill", "firstTowerKill"];

            for (let n = 0; n < arrayStatsType.length; n++) {//on boucle sur tout les baremes aggressive que l'on a choisis dans arrayStatsType

              switch (arrayStatsType[n]) {//chaque critère à son barème de score
                case "damage":
                  scoreobj = this.ApplyScoreDependingValueType("baronKill", dataBaronKill, scoreobj);
                  break;
                case "firstKill":
                  scoreobj = this.ApplyScoreDependingValueType("dragonKill", dataDragonKills, scoreobj);
                  break;
                case "firstTowerKill":
                  scoreobj = this.ApplyScoreDependingValueType("firstTowerKill", dataFirstTowerKill, scoreobj);
                  break;
                case "goldEarned":
                  scoreobj = this.ApplyScoreDependingValueType("turretKill", dataTurretKills, scoreobj);
                  break;
                case "ka":
                  scoreobj = this.ApplyScoreDependingValueType("inhibKill", dataInhibKills, scoreobj);
                  break;
              }

            }
            result = {"summoner": valueArray[i]['data']["summoner"], "scoreObjective": scoreobj};
            arrayResult.push(result);
          }
          this.arrayPassive = arrayResult;
          console.log(this.arrayPassive);

        } else {
          console.log("Type inconnu !");
        }
      }
    }


  ApplyScoreDependingValueType(type:string,value:any,score:number){

    switch (type){//on Applique le bareme selon le critere que la fonction reçois
      case "damage":
        if(value >= 0 && value <= 5000)
          score = score + 1;
        else if (value > 5000 && value <= 7500 )
          score = score + 2;
        else if (value > 7500 && value <= 15000)
          score = score + 3;
        else if (value > 15000 && value <= 22500 )
          score = score + 4;
        else
          score = score + 5;
        break;
      case "firstKill":
        if(value == 0)
          score = score + 0;
        else if (value >=1 && value <= 10 )
          score = score + 2;
        else if (value > 10 && value <= 15)
          score = score + 3;
        else if (value > 15 && value <= 25 )
          score = score + 4;
        else
          score = score + 5;
        break;
      case "firstTowerKill":
        if(value == 0)
          score = score + 0;
        else if (value >=1 && value <= 8 )
          score = score + 2;
        else if (value > 8 && value <= 12)
          score = score + 3;
        else if (value > 12 && value <= 20 )
          score = score + 4;
        else
          score = score + 5;
        break;
      case "goldEarned":
        if(value >= 0 && value <= 5000)
          score = score + 1;
        else if (value > 5000 && value <= 12500 )
          score = score + 2;
        else if (value > 12500 && value <= 20000)
          score = score + 3;
        else if (value > 20000 && value <= 25000 )
          score = score + 4;
        else
          score = score + 5;
        break;
      case "ka":
        if(value >= 0 && value <= 7500)
          score = score + 1;
        else if (value > 7500 && value <= 12500 )
          score = score + 2;
        else if (value > 12500 && value <= 15000)
          score = score + 3;
        else if (value > 15000 && value <= 22500 )
          score = score + 4;
        else
          score = score + 5;
        break;
      case "baronKill":
        if(value == 0)
          score = score + 0;
        else if (value == 1)
          score = score + 2;
        else if (value==2)
          score = score + 4;
        else
          score = score + 5;
        break;
      case "dragonKill":
        if(value == 0 )
          score = score + 0;
        else if (value >= 1 && value <= 2 )
          score = score + 2;
        else if (value >= 3 && value <= 4)
          score = score + 3;
        else if (value >= 5)
          score = score + 5;
        break;
      case "turretKill":
        if(value == 0 )
          score = score + 0;
        else if (value >= 1 && value <= 2 )
          score = score + 1;
        else if (value >= 3 && value <= 6)
          score = score + 3;
        else if (value >= 7 && value <= 10)
          score = score + 4;
        else
          score = score + 5;
        break;
      case "inhibKill":
        if(value == 0 )
          score = score + 0;
        else if (value == 1 )
          score = score + 1;
        else if (value == 2)
          score = score + 3;
        else if (value == 3)
          score = score + 4;
        else
          score = score + 5;
        break;

    }

    return score;
  }

  resetValue(){//on reset les variables quand un nouveau users est detecter afin de calculer les stats du nouveaux user à partir de 0

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
    this.dragonKills=0;
    this.turretKills=0;
    this.inhibKills=0;
    this.scoreVision=0;
    this.totalDamageTaken=0;

  }

  onSubmit(){

    let result : Algo=this.algoForm.value;
    let numberPlayer=result.agressivePlayer+result.objectivePlayer+result.safePlayer;
    if(numberPlayer>4){
      this.toaster.error("The player number can't be highest than 4 !")
      return;
    }

    if (result.agressive==true){
      if(result.agressivePlayer>0){

        let highest=0;

        for(let y=0;y<this.arrayAggressive.length;y++){
          if(highest<this.arrayAggressive[y].score){
            highest=this.arrayAggressive[y].score;
          }
        }

        // @ts-ignore
        let PlayerArraySelected=[];

        while (PlayerArraySelected.length<result.agressivePlayer) {//Tant que le nombre joueur n'est pas éagle à celui qu'on recherche on continue la boucle

          // @ts-ignore
          let PlayerSelectedByScore=this.arrayAggressive.filter(elem=>elem.score==highest);//On selectionne le ou les scores les plus hauts ....

          if(PlayerSelectedByScore[0]!=null) {//on check si il y a des joueurs qui ont le score "highest"
            for (let m = 0; m < PlayerSelectedByScore.length; m++) {
              PlayerArraySelected.push([PlayerSelectedByScore[m].summoner,PlayerSelectedByScore[m].score]);//On met les joueurs avec le score le plus haut
              if(PlayerArraySelected.length===result.agressivePlayer){//si le nombre de joueur max à été atteint on casse la boucle
                break;
              }
              // ce sont eux qui match le plus selon le type sélectionné
            }
          }

          highest=highest-1;//on retire 1 à la recherche de score afin de descendre en score est trouvé le prochain joueur le plus "haut"

        }
        console.log(PlayerArraySelected);

      }else{
        this.toaster.error("You must set a player number !")
      }
    }
    if (result.objective==true){
      if(result.objectivePlayer>0){

      }else{
        this.toaster.error("You must set a player number !")
      }
    }

    if (result.safe==true){
      if(result.safePlayer>0){

      }else{
        this.toaster.error("You must set a player number !")
      }
    }

  }

}
