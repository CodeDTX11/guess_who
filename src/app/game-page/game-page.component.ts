import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data';
import { Track } from '../models/track';
import { ConfigSettings } from '../models/configSettings';
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  constructor(private router : Router, private dataService : DataService ) { }

  tracks: Track[] = []
  @Input() track: Track ={
    artistName:"",
    artistId:"",
    trackName:"", 
    preview_url:"",
    image_url:""
  }

  score: number =0


  userConfigSettings : ConfigSettings = {
    playerName: "Default",
    numQuestions: 3
  }

  ngOnInit(): void {

    this.dataService.selectedData.subscribe((selectedData: Track[]) => this.tracks = selectedData)
    this.dataService.configSettings.subscribe((configSettings: ConfigSettings) => this.userConfigSettings = configSettings)
  
    if(!this.tracks.length){
      this.router.navigate([""])
    }

  }
  async finishGame(){
    this.router.navigate(["/endgame"])

  }

}
