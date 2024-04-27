import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import { Router } from '@angular/router';
import { Track } from "../models/track";
import { ConfigSettings } from "../models/configSettings";
import { DataService } from "src/services/data";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";
const LEADERBOARD_KEY = "leaderboard";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }

  genres: String[] = [];
  selectedGenre: String = "rock";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";

  userConfigSettings: ConfigSettings = {
    playerName: "Guest",
    numQuestions: 3
  }

  tracks: Track[] = []
  randomArtists: string[] = []

  track: Track = {
    artistName: '',
    artistId: '',
    trackName: '',
    preview_url: ''
  }

  ngOnInit(): void {
    // localStorage.clear()
    this.dataService.setActiveGame(false)
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.loadGenres(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.loadGenres(newToken.value);
    });
  }

  loadGenres = async (t: any) => {
    this.configLoading = true;

    // #################################################################################
    // DEPRECATED!!! Use only for example purposes
    // DO NOT USE the recommendations endpoint in your application
    // Has been known to cause 429 errors
    // const response = await fetchFromSpotify({
    //   token: t,
    //   endpoint: "recommendations/available-genre-seeds",
    // });
    // console.log(response);
    // #################################################################################

    this.genres = [
      "rock",
      "rap",
      "pop",
      "country",
      "hip-hop",
      "jazz",
      "alternative",
      "j-pop",
      "k-pop",
      "emo",
      'classic'
    ]

    this.configLoading = false;
  };

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    // console.log(this.selectedGenre);
    // console.log(TOKEN_KEY);
  }

  setPlayerName(event: any) {
    this.userConfigSettings.playerName = event.target.value
    // console.log(this.configSettings.playerName)
  }

  setNumQuestions(event: any) {
    this.userConfigSettings.numQuestions = event.target.value
    // console.log(this.configSettings.numQuestions)
  }

  async onSubmit() {

    this.tracks = []
    this.randomArtists = []

    const trackData = await fetchFromSpotify({
      token: this.token, endpoint: "search",
      params: {
        type: 'track',
        q: `genre:${this.selectedGenre}`,
        market: 'US',
        limit: 40,
        offset: Math.floor(960 * Math.random())
      }
    });

    const artistData = await fetchFromSpotify({
      token: this.token, endpoint: "search",
      params: {
        type: 'artist',
        q: `genre:${this.selectedGenre}`,
        market: 'US',
        limit: 50,
        offset: Math.floor(950 * Math.random())
      }
    });

    this.randomArtists = artistData.artists.items.map((item: any) => item.name)

    // console.log(this.randomArtists)

    let trackItems = trackData.tracks.items

    // console.log(tracks)
    let indices = new Set();
    while (this.tracks.length < this.userConfigSettings.numQuestions) {

      let i = Math.floor(Math.random() * trackItems.length)

      if (trackItems[i].preview_url && !indices.has(i)) {
        this.track.preview_url = trackItems[i].preview_url
        this.track.trackName = trackItems[i].name
        this.track.image_url = trackItems[i].album.images[0].url
        this.track.artistId = trackItems[i].artists[0].id
        this.track.artistName = trackItems[i].artists[0].name

        // this.tracks.push(JSON.parse(JSON.stringify(this.track)))
        this.tracks.push({ ...this.track })
        indices.add(i)
      }
    }

    // for(let item of this.tracks){
    //   console.log(item.trackName)
    // }

    this.dataService.updateRandomArtists(this.randomArtists);
    this.dataService.updateApiData(this.tracks);
    this.dataService.updateConfig(this.userConfigSettings)
    this.dataService.setActiveGame(true)

    // for (let item of this.tracks) {
    //   console.log(item)
    // }

    // console.log(this.tracks[0])

      this.router.navigate(["/game"])
  }
  async toLeaderboard(){
    this.router.navigate(["endgame"])
  }

}