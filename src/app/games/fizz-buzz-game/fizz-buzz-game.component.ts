import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FizzBangRule } from 'app/models/fizzBangRule';
import { FizzBang } from 'app/models/fizzBang';
import { FizzBuzzService } from 'app/services/fizz-buzz.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-fizz-buzz-game',
  templateUrl: './fizz-buzz-game.component.html',
  styleUrls: ['./fizz-buzz-game.component.scss'],
  providers: [ FizzBuzzService ]
})
export class FizzBuzzGameComponent implements OnInit {
  @Output() fizzBangResultsEmitter: EventEmitter<FizzBang[]> = new EventEmitter<FizzBang[]>();

  fizzBangFloor: number;
  fizzBangCeiling: number;
  fizzBangStep: number;
  fizzBangRules: FizzBangRule[];
  fizzBangResults: FizzBang[];

  newFizzBangRule: any;
  availableOperators: string[];
  showNewRuleForm = false;
  fizzBuzzService: FizzBuzzService;

  constructor(service: FizzBuzzService, private spinner: NgxSpinnerService) {
    this.fizzBuzzService = service;
   }

  ngOnInit() {
    this.newFizzBangRule = {};
    this.availableOperators = ['%', '>', '<'];
    this.fizzBangFloor = 1;
    this.fizzBangCeiling = 100;
    this.fizzBangStep = 1;

    this.spinner.show();

    this.fizzBuzzService.getFizzBangRules().subscribe(
            data => { this.fizzBangRules = data},
            err => {
              console.error(err);
              this.fizzBangRules = [
                { displayResult: 'Fizz', operator: '%', value: 3, operationResult: 0 },
                { displayResult: 'Bang', operator: '%', value: 5, operationResult: 0 }
              ];
            })
            .add(() => {
              console.log('done loading fizzBangRules');
              this.calculateFizzBang();
              this.spinner.hide();
            }
          );

    this.fizzBangResults = [];
  }

  calculateFizzBang() {
    this.fizzBangResults = [];
    for (
      let i = this.fizzBangFloor;
      i <= this.fizzBangCeiling;
      i = i + this.fizzBangStep
    ) {
      let displayValue = '';
      this.fizzBangRules.forEach(rule => {
        if (this.evaluateParameters(i, rule) === true) {
          displayValue += rule.displayResult;
        }
      });

      if (displayValue === '') {
        displayValue = i.toString();
      }

      let fizzBangResult: FizzBang;
      fizzBangResult = {
        id: i,
        value: displayValue
      };
      this.fizzBangResults.push(fizzBangResult);
    }
    this.fizzBangResultsEmitter.emit(this.fizzBangResults);
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

  delete(rule: FizzBangRule) {
    this.fizzBangRules.splice(this.fizzBangRules.indexOf(rule), 1);
    this.calculateFizzBang();
  }

  save(rule: FizzBangRule) {
    this.fizzBangRules.push(rule);
    this.newFizzBangRule = {};
    this.calculateFizzBang();
    this.showNewRuleForm = !this.showNewRuleForm;
  }

  closeNewRuleForm() {
    this.newFizzBangRule = {};
    this.showNewRuleForm = !this.showNewRuleForm;
  }
}
