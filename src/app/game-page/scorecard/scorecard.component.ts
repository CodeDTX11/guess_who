import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data';
import { ConfigSettings } from "../../models/configSettings";


@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {

  constructor(private router : Router, private dataService : DataService) {}


  userConfigSettings: ConfigSettings = {
    playerName: "Default",
    numQuestions: 3
  }
  ngOnInit(): void {
    this.dataService.configSettings.subscribe((configSettings: ConfigSettings) => this.userConfigSettings = configSettings)

  }
  async toHome(){
    this.router.navigate(["/"])
    this.dataService.setScore();

  }
  scoreToDisplay:number = this.dataService.getScore();
  // numQuestions:number = 0;

}

