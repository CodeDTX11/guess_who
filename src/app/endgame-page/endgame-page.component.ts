import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data';
import { ConfigSettings } from '../models/configSettings';

const LEADERBOARD_KEY = "leaderboard";

@Component({
  selector: 'app-endgame-page',
  templateUrl: './endgame-page.component.html',
  styleUrls: ['./endgame-page.component.css']
})

export class EndgamePageComponent implements OnInit {

  constructor(private dataService: DataService) { }

  userConfigSettings: ConfigSettings = {
    playerName: "",
    numQuestions: 0
  }

  isActive: boolean = false

  leaderboard: { name: string, score: number }[] = []

  player: { name: string, score: number } = {
    name: "",
    score: 0
  }

  ngOnInit(): void {

    this.isActive = this.dataService.isActiveGame()

    if (this.isActive) {
      this.dataService.configSettings.subscribe((configSettings: ConfigSettings) => this.userConfigSettings = configSettings)

      this.player.name = this.userConfigSettings.playerName;
      this.player.score = this.dataService.getScore()

      const storedLeaderBoardJSON = localStorage.getItem(LEADERBOARD_KEY);
      if (!storedLeaderBoardJSON) {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify([this.player]));
      } else {
        this.leaderboard = JSON.parse(storedLeaderBoardJSON)
        this.leaderboard.push(this.player)
        this.leaderboard.sort((player1, player2) => player2.score - player1.score)
        if (this.leaderboard.length > 7) {
          this.leaderboard.pop()
        }
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(this.leaderboard));
      }
    }
  }

}
