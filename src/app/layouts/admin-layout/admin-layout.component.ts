import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import { FizzBang } from 'app/models/fizzBang';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  gameResults: FizzBang[];
  gameName: string;

  constructor(public location: Location, private router: Router) {}

  ngOnInit() {
      this.gameName = 'FizzBang'
      this.gameResults = [];
  }

  handleResults($event) {
      this.gameResults = $event;
  }
}
