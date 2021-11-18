import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
// @ts-ignore
import {MatchService} from "./match.service";
import {ChampionService} from "./champion.service";
import {ItemService} from "./item.service";
import {SummonerService} from "./summoner.service";

@Injectable({
    providedIn: 'root'
  }
)
export class GetMatchResolver implements Resolve<any> {
  constructor(private matchService:MatchService) {
  }

  resolve(route: ActivatedRouteSnapshot,rstate: RouterStateSnapshot):Observable<any>{

    let summonerName=route.paramMap.get("summoner_name");

    return this.matchService.getMatch(summonerName, localStorage.getItem("token"));

  }

}

@Injectable({
    providedIn: 'root'
  }
)
export class GetChampionResolver implements Resolve<any> {
  constructor(private championService:ChampionService) {
  }

  resolve(route: ActivatedRouteSnapshot,rstate: RouterStateSnapshot):Observable<any>{

    return this.championService.getChampion();

  }

}

@Injectable({
    providedIn: 'root'
  }
)
export class GetItemResolver implements Resolve<any> {
  constructor(private itemService:ItemService) {
  }

  resolve(route: ActivatedRouteSnapshot,rstate: RouterStateSnapshot):Observable<any>{

    return this.itemService.getItem();

  }

}

@Injectable({
    providedIn: 'root'
  }
)
export class GetSummonerResolver implements Resolve<any> {
  constructor(private summonerService:SummonerService) {
  }

  resolve(route: ActivatedRouteSnapshot,rstate: RouterStateSnapshot):Observable<any>{

    return this.summonerService.getSummoners();

  }

}

@Injectable({
    providedIn: 'root'
  }
)
export class GetMatchStatResolver implements Resolve<any> {
  constructor(private matchService:MatchService) {
  }

  resolve(route: ActivatedRouteSnapshot,rstate: RouterStateSnapshot):Observable<any>{
    let token= localStorage.getItem('token');
    return this.matchService.getMatchStat(token);
  }

}

