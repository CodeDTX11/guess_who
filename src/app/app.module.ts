import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { GamePageComponent } from './game-page/game-page.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { EndgamePageComponent } from './endgame-page/endgame-page.component';
import { GamecardComponent } from './game-page/gamecard/gamecard.component';
import { ScorecardComponent } from './game-page/scorecard/scorecard.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "game", component: GamePageComponent },
  { path: "endgame", component: EndgamePageComponent },
  { path: "leaderboard", component: LeaderboardComponent }
 ];

@NgModule({
  declarations: [AppComponent, HomeComponent, GamePageComponent, LeaderboardComponent, EndgamePageComponent, GamecardComponent, ScorecardComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
