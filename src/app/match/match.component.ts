import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatchService} from "../Service/match.service";
import { match } from "../match";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  private arrayMatches: any;

  constructor(private route: ActivatedRoute,private matchService:MatchService) {

    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.' +
      'eyJpYXQiOjE2MzQ2NTQwMDAsImV4cCI6MTYzNDY1NzYwMCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1l' +
      'IjoianVsaWVuLm1hbGxldC5wcm9AZ21haWwuY29tIn0.XWN2xnlauzy0cLPVNLbKkF1TJpKj2DUUnVAVi_4fskRQGq' +
      'Law-ykACkhTkqbmy8iR8Ul1IuuOB3fcZdRrgo8RhaqXOHyHkcym8mG3W-FWVSIXn_c6aY9nlpn--GPjRkcfsw8Os8' +
      'Egsn7Lsfu4wkMshXi8TDP1AdugGg-ix_MGhCpeARH6u2hpcAjWZvKM4NY_3fkSYkhvoXugkJm9L80HmJ3E9Tl7cKMj3' +
      'ET2GZaIo68Jomz5BxvGvnnsaccdVcmLS2hpAbwDC244iV3jVsGXLK28dqPdtRmpwVdYVWLA7fgRU_h_3sJ9nlXg7PLW2V' +
      'PX5XOHYZ6TcTtcnheuSnycQ');

  }

  ngOnInit(): void {

    let str =this.route.snapshot.paramMap.get('summoner_name');
    let token = localStorage.getItem('token');
    if (str != null && token!=null) {
      let matchValue= this.matchService.getMatch(str);
      // @ts-ignore
      matchValue.toPromise().then(value =>{this.arrayMatches=value; let x =this.arrayMatches});

    }

    console.log(x);
  }

}
