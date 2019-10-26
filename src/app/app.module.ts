import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FizzBuzzGameComponent } from './games/fizz-buzz-game/fizz-buzz-game.component';
import { FizzBuzzService } from './services/fizz-buzz.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FizzBuzzGameComponent
  ],
  providers: [FizzBuzzService],
  bootstrap: [AppComponent]
})
export class AppModule { }
