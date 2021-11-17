import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatchService} from "../service/match.service";
import {GetSummonerResolver} from "../Service/resolver.service";
import {match} from "../match";
import {interval} from "rxjs";

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
  public arrayParticipant:any;

  constructor(private route: ActivatedRoute,private matchService:MatchService,private renderer:Renderer2) {

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
  match_detail(matchId:string){

    let match_detail=document.getElementById(matchId);

    if(match_detail!=null) {

      match_detail.style.display = "block";

      let divMatch=document.createElement("div");
      divMatch.setAttribute("class","match");

      for(let i=0;i<this.arrayMatches['matchs'].length;i++){
        if(this.arrayMatches['matchs'][i]["match_id"]===matchId){
          let participants=this.arrayMatches['matchs'][i]["participant"];
          for(let v=0;v<participants.length;v++){

            let divMatchLeft=document.createElement("div");
            divMatchLeft.setAttribute("class","divMatchLeft");
            divMatch.appendChild(divMatchLeft);
            let divMatchRight=document.createElement("div");
            divMatchRight.setAttribute("class","divMatchRight");
            divMatch.appendChild(divMatchRight);

            for(let u=0;u<this.arrayChampions.length;u++){

              if(this.arrayChampions[u]['KeyChampion']===participants[v]['championId']){
                let imgChampion=document.createElement("img");
                imgChampion.setAttribute("src","//opgg-static.akamaized.net/images/lol/champion/"+this.arrayChampions[u]['Image']['full']+"?image=c_scale,q_auto,w_46&v=1635906101");
                divMatchLeft.appendChild(imgChampion);
                break;
              }
            }

            let spellDiv =document.createElement('div');
            spellDiv.setAttribute("class","spell");
            divMatchLeft.appendChild(spellDiv);

            for(let u=0;u<this.arraySummoners.length;u++){

              if(this.arraySummoners[u]['keySummoners']==participants[v]['spell1Id'] || this.arraySummoners[u]['keySummoners']==participants[v]['spell2Id'] ){
                let imgSummoners=document.createElement("img");
                imgSummoners.setAttribute("src","//opgg-static.akamaized.net/images/lol/spell/"+this.arraySummoners[u]['image']+"?image=c_scale,q_auto,w_46&v=1635906101");
                spellDiv.appendChild(imgSummoners);
              }
            }
            let runesDiv =document.createElement('div');
            runesDiv.setAttribute("class","runes");
            let imgPerk0=document.createElement("img");
            imgPerk0.setAttribute("src","//opgg-static.akamaized.net/images/lol/perk/"+participants[v]['perk0']+".png?image=c_scale,q_auto,w_46&v=1635906101");
            let imgPerk5=document.createElement("img");
            imgPerk5.setAttribute("src","//opgg-static.akamaized.net/images/lol/perk/"+participants[v]['perk5']+".png?image=c_scale,q_auto,w_46&v=1635906101");
            divMatchLeft.appendChild(runesDiv);
            runesDiv.appendChild(imgPerk0);
            runesDiv.appendChild(imgPerk5);
            let divText =document.createElement('div');
            divText.setAttribute("class","text");
            divMatchRight.appendChild(divText);
            let peleme =document.createElement('p');
            peleme.innerHTML=participants[v]['kills']+"/"+participants[v]['deaths']+"/"+participants[v]['assist'];
            divText.appendChild(peleme);
            let divImgItems =document.createElement('div');
            divImgItems.setAttribute("class","imgs");
            divText.appendChild(divImgItems);

            for(let p=0;p<participants[v]["item"].length;p++){
              let imgItem=document.createElement('img');
              imgItem.setAttribute("src","https://opgg-static.akamaized.net/images/lol/item/"+participants[v]["item"][p]+".png?image=c_scale,q_auto,w_22&v=1635906101");
              divImgItems.appendChild(imgItem);
            }

            let divText2=document.createElement('div');
            divText2.setAttribute("class","text");
            divText.appendChild(divText2);

            let peleme2 =document.createElement('p');
            peleme2.innerHTML=((participants[v]['kills']+participants[v]['assist'])/participants[v]['deaths']).toFixed(2)+" KDA";
            divText2.appendChild(peleme2);

          }
          break;
        }
      }
      match_detail.appendChild(divMatch);

    }
  }
}
