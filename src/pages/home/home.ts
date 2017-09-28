import { CityServiceProvider } from './../../providers/city-service/city-service';
import { OpenWeatherCity } from './../../model/OpenWeatherCity.model';
import { CityDetailsPageModule } from './../city-details/city-details.module';
import { CityDetailsPage } from './../city-details/city-details';
import { AddCidadePage } from './../add-cidade/add-cidade';
import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  now: string;
  items  = [];
  entrou: number;

  constructor(public navCtrl: NavController , public http : Http ,
               public storage: Storage , public cityServ: CityServiceProvider,
               public loadingCtrl : LoadingController , public alertCtrl: AlertController) {
    var timeWindow: number = new Date().getHours();

    this.entrou = 1;

    if (timeWindow < 6 ||  timeWindow > 18){
      this.now = "night";
    } else {
      this.now = "day";
    }
        
  }

  ionViewCanLeave(){
    this.entrou += 1; 
    this.items = [];
  }


  showLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde até que as cidades sejam carregadas",
      duration: 3000
    });
    loader.present();
  }
  
  showErrorAlert(){
    let alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: 'Ocorreu um erro ao tentar carregar a cidade',
      buttons: ['Ok']
    });
    alert.present();
  }


  ionViewWillEnter(){
    this.showLoading();
    this.storage.get("cities").then( (cidades) => {
      for (let cidade of cidades){
        this.cityServ.loadWeather(parseInt(cidade))
        .then( (open) => {
          this.items.push(open);
        }).catch( () =>{
         this.showErrorAlert();
        });
      } 
    })
    .catch( () =>{
      this.showErrorAlert();
    });
  }

  addCidade(){
    this.navCtrl.push(AddCidadePage);
  }

  cityDetails(cityDetail: OpenWeatherCity){
    this.navCtrl.push(CityDetailsPage,{ 
      city: cityDetail  
    });
  }

 }