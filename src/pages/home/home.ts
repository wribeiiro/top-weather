import { CityDetailsPageModule } from './../city-details/city-details.module';
import { CityDetailsPage } from './../city-details/city-details';
import { AddCidadePage } from './../add-cidade/add-cidade';
import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  now: string;
  items = [];
  apiAddr: string = "http://api.openweathermap.org/data/2.5/weather?";
  apiKey: string = "&appid=e36fb148ee55f4f8866e03a64ac06ac2";
  apiSuffix: string = "&units=metric&lang=pt";
  entrou: number;

  constructor(public navCtrl: NavController , public http : Http , public storage: Storage) {
    var timeWindow: number = new Date().getHours();

    this.entrou = 1;

    if (timeWindow < 6 ||  timeWindow > 18){
      this.now = "night";
    } else {
      this.now = "day";
    }
        
  }

  ionViewWillEnter(){
    if (this.entrou > 1){
      this.getCity();      
    }    
  }

  ionViewCanLeave(){
    this.entrou += 1; 
    this.items = [];
  }
    

  addCidade(){
    this.navCtrl.push(AddCidadePage);
  }

  cityDetails(cityDetail: OpenWeatherCity){
    this.navCtrl.push(CityDetailsPage,{ 
      city: cityDetail  
    });
  }

  getCity(){
    this.storage.get("cidades").then( (cidades) => { 

      for (let cidade of cidades){
          this.loadWeather(cidade)
      }
    });
  }

  loadWeather(cityCode: string){
    let apiURL = this.apiAddr + "q="+ cityCode + this.apiKey + this.apiSuffix;
    var cityData: OpenWeatherCity;
    this.http.get(apiURL).map(res => res.json()).subscribe(data => {
      cityData = new OpenWeatherCity();
      cityData.name = data.name;
      cityData.lat = data.coord.lat;
      cityData.log = data.coord.lon;
      cityData.weatherCondition = data.weather[0].main;
      cityData.weatherDescription = data.weather[0].description;
      cityData.weatherIconName = data.weather[0].icon;

     switch (cityData.weatherIconName) {
        case ("01d"):
          cityData.weatherIcon = "sunny";
          cityData.weatherDeion = "Ensolarado";
          break;
        case("01n"):
          cityData.weatherIcon = "moon";
          cityData.weatherDeion = "Tempo aberto";
          break;
        case("02d"):
          cityData.weatherIcon = "partly-sunny";
          cityData.weatherDeion = "Nuvens esparsas";
          break;
        case("02n"):
          cityData.weatherIcon = "cloudy-night";
          cityData.weatherDeion = "Nuvens esparsas";
          break;
        case("03d"):
          cityData.weatherIcon = "cloudy";
          cityData.weatherDeion = "Nublado";
          break;
        case("03n"):
          cityData.weatherIcon = "cloudy";
          cityData.weatherDeion = "Nublado";
          break;
      case("04d"):
          cityData.weatherIcon = "partly-sunny";
          cityData.weatherDeion = "Parc. nublado";
          break;
      case("04n"):
          cityData.weatherIcon = "cloudy-night";
          cityData.weatherDeion = "Parc. nublado";
          break;
      case("09d"):
          cityData.weatherIcon = "rainy";
          cityData.weatherDeion = "Pancadas";
         break;
      case("09n"):
         cityData.weatherIcon = "rainy";
         cityData.weatherDeion = "Pancadas";
          break;
      case("10d"):
          cityData.weatherIcon = "rainy";
          cityData.weatherDeion = "Chuva";
          break;
      case("10n"):
          cityData.weatherIcon = "rainy";
          cityData.weatherDeion = "Chuva";
          break;
      case("11d"):
          cityData.weatherIcon = "thunderstorm";
          cityData.weatherDeion = "Temporal";
          break;
        case("11n"):
          cityData.weatherIcon = "thunderstorm";
          cityData.weatherDeion = "Temporal";
          break;
      case("13d"):
          cityData.weatherIcon = "snow";
          cityData.weatherDeion = "Neve";
          break;
      case("13n"):
         cityData.weatherIcon = "snow";
         cityData.weatherDeion = "Neve";
        break;
      case("50d"):
          cityData.weatherIcon = "reorder";
          cityData.weatherDeion = "Neblina/Nevoeiro";
          break;
      case("50n"):
          cityData.weatherIcon = "reorder";
          cityData.weatherDeion = "Neblina/Nevoeiro";
          break;
      }

      cityData.temp = data.main.temp;
      cityData.pressure = data.main.pressure;
      cityData.humidity = data.main.humidity;
      cityData.visibility = data.visibility;
      cityData.windSpd = data.wind.speed;
      cityData.windDeg = data.wind.deg;
      let windDirNumber = Number(cityData.windDeg);
      
      if (windDirNumber >= 340 || windDirNumber <= 20) {
        cityData.windDir = "N";
      } else if (windDirNumber >= 70 && windDirNumber <= 100) {
        cityData.windDir = "E";
      } else if (windDirNumber >= 160 && windDirNumber <= 200) {
        cityData.windDir = "S";
      } else if (windDirNumber >= 250 || windDirNumber <= 290) {
        cityData.windDir = "W";
      } else if (windDirNumber >= 21 || windDirNumber <= 69) {
        cityData.windDir = "NE";
      } else if (windDirNumber >= 101 || windDirNumber <= 159) {
        cityData.windDir = "SE";
      } else if (windDirNumber >= 201 || windDirNumber <= 249) {
        cityData.windDir = "SO";
      } else if (windDirNumber >= 291 || windDirNumber <= 339) {
        cityData.windDir = "NO";
      }

      cityData.clouds = data.clouds.all;
      cityData.sunrise = data.sys.sunrise;
      cityData.sunset = data.sys.sunset;
      this.items.push(cityData);

    });
  }
}

 @Injectable()
 export class OpenWeatherCity {
    name: string;
    lat: string;
    lon: string;
    weatherCondition: string;
    weatherDeion: string;
    weatherIconName: string;
    weatherIcon: string;
    temp: string;
    pressure: string;
    humidity: string;
    visibility: string;
    windSpd: string;
    windDeg: string;
    windDir: string;
    clouds: string;
    sunrise: string;
    sunset: string;
    log: string;
    weatherDescription: string;
    
    constructor() {}    
}
