import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {


 /* active = 1;*/
  /*items: MenuItem[]=[];*/
  constructor(){

  }

  ngOnInit():void {
    /*this.items = [
      {icon: 'pi pi-fw pi-search', label: "Search"},
      {icon: 'pi pi-fw pi-shield', label: "Games", routerLink: 'games'},
      {icon: 'pi pi-fw pi-star-o', label: "N4L"},
      {icon: 'pi pi-fw pi-heart', label: "Fav"},
    ];*/
  }

}
