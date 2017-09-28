import { CityServiceProvider } from './../../providers/city-service/city-service';

import { Http } from '@angular/http';
import { CityProvider } from './../../providers/city/city';
import { OpenWeatherCity } from './../../model/OpenWeatherCity.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-add-cidade',
  templateUrl: 'add-cidade.html',
})
export class AddCidadePage {

  city: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public alertCtrl: AlertController, public http: Http,
    public cityServ: CityServiceProvider, public loadingCtrl: LoadingController , 
    public cityDAO: CityProvider) {
  }


  showAlert = true;

  //Sai da página
  public exitPage() {
    this.showAlert = false;
    this.navCtrl.pop();
  }

  //Array utilizado para salvar no banco de dados
  cidades;

  //Mostra loading
  showLoading() {
    let loader = this.loadingCtrl.create({
      content: "Por favor aguarde",
      duration: 3000
    });
    loader.present();
  }

  showErrorAlert(){
    let alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: `Não foi possível inserir a cidade ${this.city} !`,
      buttons: ['OK']
    });
    alert.present();
    this.city = null;
  }

  //Chama método no DAO para salvar cidade
  saveCity() {
    //Testa se cidade foi informada
    if (this.city === undefined) {
      let alert = this.alertCtrl.create({
        title: 'Insira uma cidade!',
        subTitle: 'Para adicionar uma cidade é necessário inserir o nome da mesma!',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      //Inicia showLoading
      this.showLoading();
      //Instancia Objeto
      var city: OpenWeatherCity = new OpenWeatherCity();
      //Chama método que faz requisição HTTP para retornar o objeto
      this.cityServ.loadWeatherToSave(this.city)
        .then((resolve) => {
          city.id = resolve.id;
          city.name = resolve.name;
          //Se cidade existir questiona se deseja realmente adicionar
          if (city.id > 0) {
            if (this.showAlert) {
              let response = this.alertCtrl.create({
                title: `Deseja Adicionar a cidade ${this.city}`,
                message: "Você tem certeza que deseja adicionar?",
                buttons: [{
                  text: 'Sim',
                  handler: () => {
                    //Salva Cidade
                    if (this.cityDAO.saveCity(city.id)) {
                      this.city = null;
                      this.exitPage();
                    }
                    else {
                      this.showErrorAlert();
                    }
                  }
                },
                {
                  text: 'Não',
                  handler: () => {
                    this.city = null;
                  }
                }]
              });
              response.present();
              return false;
            }
          }
        })
        .catch( (resolve) => {
          //Em caso de erro informa cidade que não foi possível inserir.
          this.showErrorAlert();
        });
      }
    }
  }
