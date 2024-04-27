import { Component, Input,Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data';
import { Track } from '../../models/track';
import { update } from 'lodash';
// import { ConfigSettings } from '../models/configSettings';
@Component({
  selector: 'app-gamecard',
  templateUrl: './gamecard.component.html',
  styleUrls: ['./gamecard.component.css']
})
export class GamecardComponent implements OnInit {
  constructor(private router : Router, private dataService : DataService ) { }

  // tracks: Track[] = []

  // userConfigSettings : ConfigSettings = {
  //   playerName: "Default",
  //   numQuestions: 3
  // }
  @Input() track: Track ={
    artistName:"",
    artistId:"",
    trackName:"", 
    preview_url:"",
    image_url:""
  }
  // @Output() score:number=0;
  // answerSwitch:number=0
     wrongAnswerBefore:number=0
     rightAnswerBefore:number=0


  randArtists: string[] = []
  answerOptions: string[] = []
  selectedAnswer: string = ""
  numRightAnswers: number=0


  ngOnInit(): void {
    
    this.dataService.randomArtists.subscribe((randomArtists: string[]) => this.randArtists = randomArtists)
    // this.dataService.configSettings.subscribe((configSettings: ConfigSettings) => this.userConfigSettings = configSettings)
    
    //get 3 random artists from the artist pool
    while(this.answerOptions.length < 3){
      let artist = this.randArtists[Math.floor(Math.random() * this.randArtists.length)]
      if(artist !== this.track.artistName){
        this.answerOptions.push(artist)
      }
    }
    //add the actual answer
    this.answerOptions.push(this.track.artistName)
    
    //this will randomly shuffle the array so the answer isn't always in the same place. Found it online
    this.answerOptions.sort(() => Math.random() - 0.5); 
  }


  selectAnswer(event:any){

    this.selectedAnswer = event.target.value
    console.log(this.selectedAnswer)

    if(this.selectedAnswer == this.track.artistName){
      if(this.rightAnswerBefore===0){
        this.dataService.incrementScore()
        }
         console.log("Correct!")
         this.rightAnswerBefore=1;
         this.wrongAnswerBefore=0;
    }
    else{
      if(this.rightAnswerBefore){
        if(this.wrongAnswerBefore===0){
          this.dataService.decrementScore();
        }
        console.log("Incorrect")
        this.rightAnswerBefore=0;
        // this.wrongAnswerBefore=1;
      }

    }
    console.log(this.dataService.getScore())
    //if wrong answer do nothing
    //if right answer increment count
    //if wrong answer after right answer: decrement count
    //if wrong answer after wrong answer do nothing
    //if right answer after right answer do nothing

  }
}
