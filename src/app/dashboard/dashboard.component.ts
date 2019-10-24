import { Component, OnInit } from '@angular/core';
import { FizzBang } from 'app/models/fizzBang';
import { FizzBangRule } from 'app/models/fizzBangRule'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fizzBangResults: FizzBang[];
  fizzBangFloor: number;
  fizzBangCeiling: number;
  fizzBangRules: FizzBangRule[];

  constructor() { }

  ngOnInit() {
      this.fizzBangFloor = 1;
      this.fizzBangCeiling = 100;

      this.fizzBangRules = [
        {displayResult: 'Fizz', operator: '%', value: 3, operationResult: 0},
        {displayResult: 'Bang', operator: '%', value: 5, operationResult: 0},
        {displayResult: 'Boom', operator: '>', value: 50}
      ];

      this.fizzBangResults = []

      this.calculateFizzBang();
  }


  calculateFizzBang() {
    for (let i = this.fizzBangFloor; i <= this.fizzBangCeiling; i++) {
      let displayValue = '';
      this.fizzBangRules.forEach(rule => {
        if (this.evaluateParameters(i, rule) === true) {
          displayValue += rule.displayResult;
        }
      });

      if (displayValue === '') { displayValue = i.toString(); }

      let fizzBangResult: FizzBang;
      fizzBangResult = {
        id: i,
        value: displayValue
      };
      this.fizzBangResults.push(fizzBangResult);
    }
  }

  evaluateParameters(parameter1: number, fizzBangRule: FizzBangRule) {
    switch (fizzBangRule.operator) {
      case '%': {
        return parameter1 % fizzBangRule.value === fizzBangRule.operationResult;
      }
      case '>': {
        return parameter1 > fizzBangRule.value;
      }
      case '<': {
        return parameter1 < fizzBangRule.value;
      }
      default: {
        break;
      }
    }
  }
}
