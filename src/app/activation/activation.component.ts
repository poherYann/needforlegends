import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActivationService} from "../service/activation.service";

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private activationService:ActivationService) { }

  ngOnInit(): void {

   const token= this.activatedRoute.snapshot.params['token'];

   if(token!=null){
     this.activationService.getTokenActivation(token);
   }
  }

}
