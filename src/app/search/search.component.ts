import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Login} from "../login";
import {Search} from "../search";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm = this.fb.group({
    search:[""],
  });
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit() {

    let result : Search=this.searchForm.value;
    console.log(result.search);

    this.router.navigate(["/match",result.search]);

  }
}
