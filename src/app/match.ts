export class match{
  information:Array<any> | undefined;
  match:Array<any> | undefined;
  summoner_name:string;
  stats:Array<any> | undefined;

  constructor(information?:Array<any>, match?:Array<any>, summoner_name?:string, stats?:Array<any>) {
    this.information =information;
    this.match = match;
    this.summoner_name = summoner_name===undefined?"":summoner_name;
    this.stats = stats;

  }
}
