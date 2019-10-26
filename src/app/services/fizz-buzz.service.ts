import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FizzBangRule } from 'app/models/fizzBangRule';

@Injectable({
  providedIn: 'root'
})
export class FizzBuzzService {

  constructor(private http: HttpClient) { }

  getFizzBangRules() {
    return this.http.get<FizzBangRule[]>('http://localhost:65008/api/fizzbuzz/rules');
  }
}
