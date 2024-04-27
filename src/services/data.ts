import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from 'src/app/models/track';
import { ConfigSettings } from 'src/app/models/configSettings';


@Injectable({
    providedIn: 'root'
})

export class DataService {

    private defalutConfigs: ConfigSettings = {
        playerName: "Guest",
        numQuestions: 3
    }
    // private score =0;
    private finalScore = 0

    private activeGame = false;

    setActiveGame(value:boolean){
        this.activeGame = value;
    }

    isActiveGame(){
        return this.activeGame;
    }

    incrementScore(){
        this.finalScore+=1
    }
    decrementScore(){
        this.finalScore-=1
    }
    getScore(){
        return this.finalScore;
    }
    setScore(){
         this.finalScore=0; 
    }
    getNumQuestions(){
    //    return this.configSettings.numQuestions;
    }
    private apiDataSource = new BehaviorSubject<Track[]>([])
    selectedData = this.apiDataSource.asObservable();

    private configSource = new BehaviorSubject<ConfigSettings>(this.defalutConfigs)
    configSettings = this.configSource.asObservable();

    private randomArtistsSource = new BehaviorSubject<string[]>([])
    randomArtists = this.randomArtistsSource.asObservable();


    updateApiData(tracks: Track[]) {
        this.apiDataSource.next(tracks)
    }

    updateConfig(config: ConfigSettings) {
        this.configSource.next(config)
    }

    updateRandomArtists(artists: string[]) {
        this.randomArtistsSource.next(artists)
    }
}