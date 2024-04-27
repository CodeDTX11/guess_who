import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data';

interface player {
  name: string,
  score: number
}

const LEADERBOARD_KEY = "leaderboard";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent implements OnInit {
  
  constructor(private router:Router, private dataService: DataService) { }

  leaderBoard : player[] = []

  emptyBoard: boolean = false

  isActive : boolean = this.dataService.isActiveGame()

  ngOnInit(): void {

    const storedLeaderBoardJSON = localStorage.getItem(LEADERBOARD_KEY);
    if (storedLeaderBoardJSON) {
      const leaderBoard = JSON.parse(storedLeaderBoardJSON);
      this.leaderBoard = leaderBoard

    } else {
      this.emptyBoard = true
    }

  }

  toHome(){
    this.router.navigate([""])
  }
}
