import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FizzBuzzRule } from 'app/models/fizzBuzzRule';

@Injectable({
  providedIn: 'root'
})
export class FizzBuzzService {

  constructor(private http: HttpClient) { }

  getFizzBuzzRules() {
    return this.http.get<FizzBuzzRule[]>('http://localhost:65008/api/fizzbuzz/rules');
  }
}
