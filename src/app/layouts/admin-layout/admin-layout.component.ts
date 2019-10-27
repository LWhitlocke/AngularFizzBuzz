import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import { FizzBuzz } from 'app/models/fizzBuzz';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  gameResults: FizzBuzz[];
  gameName: string;

  showFizzBuzz: boolean;
  showFizzBuzzTwo: boolean;
  showTable: boolean;

  constructor(public location: Location, private router: Router) {}

  ngOnInit() {
      this.gameName = 'FizzBuzz'
      this.gameResults = [];
      this.showFizzBuzz = false;
      this.showFizzBuzzTwo = false;
      this.showTable = false;
  }

  handleResults($event) {
      this.gameResults = $event;
  }

  toggleFizzBuzz() {
    this.gameName = 'FizzBuzz'
    this.gameResults = [];
    this.showFizzBuzz = true;
    this.showFizzBuzzTwo = false;
    this.showTable = true;
  }

  toggleFizzBuzzTwo() {
    this.gameName = 'Other Game'
    this.gameResults = [];
    this.showFizzBuzz = false;
    this.showFizzBuzzTwo = true;
    this.showTable = true;
  }

}
