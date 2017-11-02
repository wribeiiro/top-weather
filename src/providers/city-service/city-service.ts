import { LatLng } from './../../model/LatLng.model';
import { OpenWeatherCity } from './../../model/OpenWeatherCity.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CityServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CityServiceProvider {

  //Site da API
  apiAddr: string = "http://api.openweathermap.org/data/2.5/weather?";
  //Chave da aplicação
  apiKey: string = "&appid=e36fb148ee55f4f8866e03a64ac06ac2";
  //Sufixos de busca
  apiSuffix: string = "&units=metric&lang=pt";

  constructor(public http: Http) {
  }

  //Consulta a cidade via nome e retorna uma Promise com id e nome da cidade
  public loadWeatherToSave(cityCode: string): Promise<OpenWeatherCity>{
    //Retorna Promise
    return new Promise<OpenWeatherCity> ( (resolve) => {
      let apiURL = this.apiAddr + "q="+ cityCode + this.apiKey + this.apiSuffix;
      //Faz requisição HTTP
      this.http.get(apiURL).map( res => res.json()).subscribe(data => {
        //Cria instancia do objeto e atribui variáveis
        let open: OpenWeatherCity = new OpenWeatherCity();
        open.name =  data.name;
        open.id = data.id;

        //Retorna Objeto
        resolve(open);
       });
    })      
  }

  loadWeatherByLatLng(latLng: LatLng) : Promise<OpenWeatherCity>{
    return new Promise<OpenWeatherCity> ( (resolve) => {
      let apiURL = this.apiAddr + "lat="+ latLng.lat + "&lon="+latLng.lng + this.apiKey + this.apiSuffix;
      var cityData: OpenWeatherCity = new OpenWeatherCity();
      //Faz a requisição a API
      this.http.get(apiURL).map(res => res.json()).subscribe(data => {
        //Atribuições de dados ao Objeto
        cityData.name = data.name;
        cityData.lat = data.coord.lat;
        cityData.log = data.coord.lon;
        cityData.weatherCondition = data.weather[0].main;
        cityData.weatherDescription = data.weather[0].description;
        cityData.weatherIconName = data.weather[0].icon
        cityData.id = data.id;
        cityData.temp = data.main.temp;
        cityData.pressure = data.main.pressure;
        cityData.humidity = data.main.humidity;
        cityData.visibility = data.visibility;
        cityData.windSpd = data.wind.speed;
        cityData.windDeg = data.wind.deg;
        let windDirNumber = Number(cityData.windDeg);
        cityData.clouds = data.clouds.all;
        cityData.sunrise = data.sys.sunrise;
        cityData.sunset = data.sys.sunset;
  
       //Seleciona Icone
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
        
        
        //Testa direção do Vento e atribui cityData.windDir
        if (windDirNumber >= 340 || windDirNumber <= 20) {
          cityData.windDir = "N";
        }
        else if (windDirNumber >= 70 && windDirNumber <= 100) {
          cityData.windDir = "E";
        }
        else if (windDirNumber >= 160 && windDirNumber <= 200) {
          cityData.windDir = "S";
        }
        else if (windDirNumber >= 250 || windDirNumber <= 290) {
          cityData.windDir = "W";
        }
        else if (windDirNumber >= 21 || windDirNumber <= 69) {
          cityData.windDir = "NE";
        }
        else if (windDirNumber >= 101 || windDirNumber <= 159) {
          cityData.windDir = "SE";
        }
        else if (windDirNumber >= 201 || windDirNumber <= 249) {
          cityData.windDir = "SO";
        }
        else if (windDirNumber >= 291 || windDirNumber <= 339) {
          cityData.windDir = "NO";
        }
  
        
        //Retorna Objeto
        resolve(cityData);
      });      
    });
  }


  //Consulta a cidade via ID e retorna uma Promise com o objeto OpenWeatherCityCompleto
  loadWeather(cityCode: number) : Promise<OpenWeatherCity>{
    return new Promise<OpenWeatherCity> ( (resolve) => {
      let apiURL = this.apiAddr + "id="+ cityCode + this.apiKey + this.apiSuffix;
      var cityData: OpenWeatherCity = new OpenWeatherCity();
      //Faz a requisição a API
      this.http.get(apiURL).map(res => res.json()).subscribe(data => {
        //Atribuições de dados ao Objeto
        cityData.name = data.name;
        cityData.lat = data.coord.lat;
        cityData.log = data.coord.lon;
        cityData.weatherCondition = data.weather[0].main;
        cityData.weatherDescription = data.weather[0].description;
        cityData.weatherIconName = data.weather[0].icon
        cityData.id = data.id;
        cityData.temp = data.main.temp;
        cityData.pressure = data.main.pressure;
        cityData.humidity = data.main.humidity;
        cityData.visibility = data.visibility;
        cityData.windSpd = data.wind.speed;
        cityData.windDeg = data.wind.deg;
        let windDirNumber = Number(cityData.windDeg);
        cityData.clouds = data.clouds.all;
        cityData.sunrise = data.sys.sunrise;
        cityData.sunset = data.sys.sunset;
  
       //Seleciona Icone
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
        
        
        //Testa direção do Vento e atribui cityData.windDir
        if (windDirNumber >= 340 || windDirNumber <= 20) {
          cityData.windDir = "N";
        }
        else if (windDirNumber >= 70 && windDirNumber <= 100) {
          cityData.windDir = "E";
        }
        else if (windDirNumber >= 160 && windDirNumber <= 200) {
          cityData.windDir = "S";
        }
        else if (windDirNumber >= 250 || windDirNumber <= 290) {
          cityData.windDir = "W";
        }
        else if (windDirNumber >= 21 || windDirNumber <= 69) {
          cityData.windDir = "NE";
        }
        else if (windDirNumber >= 101 || windDirNumber <= 159) {
          cityData.windDir = "SE";
        }
        else if (windDirNumber >= 201 || windDirNumber <= 249) {
          cityData.windDir = "SO";
        }
        else if (windDirNumber >= 291 || windDirNumber <= 339) {
          cityData.windDir = "NO";
        }
  
        
        //Retorna Objeto
        resolve(cityData);
      });      
    });
  }
}
