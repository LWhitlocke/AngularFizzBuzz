import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FizzBuzzRule } from 'app/models/fizzBuzzRule';
import { FizzBuzz } from 'app/models/fizzBuzz';
import { FizzBuzzService } from 'app/services/fizz-buzz.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fizz-buzz-game',
  templateUrl: './fizz-buzz-game.component.html',
  styleUrls: ['./fizz-buzz-game.component.scss'],
  providers: [ FizzBuzzService ]
})
export class FizzBuzzGameComponent implements OnInit {
  @Output() fizzBuzzResultsEmitter: EventEmitter<FizzBuzz[]> = new EventEmitter<FizzBuzz[]>();

  fizzBuzzFloor: number;
  fizzBuzzCeiling: number;
  fizzBuzzStep: number;
  fizzBuzzRules: FizzBuzzRule[];
  fizzBuzzResults: FizzBuzz[];

  newFizzBuzzRule: any;
  availableOperators: string[];
  showNewRuleForm = false;
  fizzBuzzService: FizzBuzzService;

  floorEditMode: boolean;
  ceilingEditMode: boolean;
  stepperEditMode: boolean;

  constructor(service: FizzBuzzService, private spinner: NgxSpinnerService) {
    this.fizzBuzzService = service;
   }

  ngOnInit() {
    this.newFizzBuzzRule = {};
    this.availableOperators = ['%', '>', '<', '='];
    this.fizzBuzzFloor = 1;
    this.fizzBuzzCeiling = 100;
    this.fizzBuzzStep = 1;
    this.floorEditMode = false;
    this.ceilingEditMode = false;
    this.stepperEditMode = false;

    this.spinner.show();

    this.fizzBuzzService.getFizzBuzzRules().subscribe(
            data => { this.fizzBuzzRules = data},
            err => {
              console.error(err);
              this.fizzBuzzRules = [
                { displayResult: 'Fizz', operator: '%', value: 3, operationResult: 0 },
                { displayResult: 'Buzz', operator: '%', value: 5, operationResult: 0 }
              ];
            })
            .add(() => {
              console.log('done loading fizzBuzzRules');
              this.calculateFizzBuzz();
              this.spinner.hide();
            }
          );

    this.fizzBuzzResults = [];
  }

  calculateFizzBuzz() {
    this.spinner.show();
    this.fizzBuzzResults = [];
    for (let i = this.fizzBuzzFloor; i <= this.fizzBuzzCeiling; i = i + this.fizzBuzzStep) {
      let displayValue = '';
      this.fizzBuzzRules.forEach(rule => {
        if (this.evaluateParameters(i, rule) === true) {
          displayValue += rule.displayResult;
        }
      });

      if (displayValue === '') {
        displayValue = i.toString();
      }

      let fizzBuzzResult: FizzBuzz;
      fizzBuzzResult = {
        id: i,
        value: displayValue
      };
      this.fizzBuzzResults.push(fizzBuzzResult);
    }
    this.fizzBuzzResultsEmitter.emit(this.fizzBuzzResults);
    this.spinner.hide();
  }

  evaluateParameters(parameter1: number, fizzBuzzRule: FizzBuzzRule) {
    switch (fizzBuzzRule.operator) {
      case '%': {
        return parameter1 % fizzBuzzRule.value === fizzBuzzRule.operationResult;
      }
      case '>': {
        return parameter1 > fizzBuzzRule.value;
      }
      case '<': {
        return parameter1 < fizzBuzzRule.value;
      }
      case '=': {
        return parameter1 === fizzBuzzRule.value;
      }
      default: {
        break;
      }
    }
  }

  delete(rule: FizzBuzzRule) {
    this.fizzBuzzRules.splice(this.fizzBuzzRules.indexOf(rule), 1);
    this.calculateFizzBuzz();
  }

  save(rule: FizzBuzzRule) {
    this.fizzBuzzRules.push(rule);
    this.newFizzBuzzRule = {};
    this.calculateFizzBuzz();
    this.showNewRuleForm = !this.showNewRuleForm;
  }

  closeNewRuleForm() {
    this.newFizzBuzzRule = {};
    this.showNewRuleForm = !this.showNewRuleForm;
  }

  toggleEditMode(element: string, reloadResults: boolean = false) {
    switch (element) {
      case 'floorEditMode': {
        this.floorEditMode = !this.floorEditMode;
        break;
      }
      case 'ceilingEditMode': {
        this.ceilingEditMode = !this.ceilingEditMode;
        break;
      }
      case 'stepperEditMode': {
        this.stepperEditMode = !this.stepperEditMode;
        break;
      }
    }

    if (reloadResults === true) {
      this.calculateFizzBuzz();
    }
  }
}
