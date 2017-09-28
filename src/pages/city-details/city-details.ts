import { CityProvider } from './../../providers/city/city';
import { HomePage } from './../home/home';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-city-details',
  templateUrl: 'city-details.html',
})
export class CityDetailsPage {

  items = [];
  city ;

  constructor(public navCtrl: NavController, public navParams: NavParams , 
    public storage: Storage, public alertCtrl: AlertController, public cityDAO: CityProvider) {
    this.city = this.navParams.get("city");
    this.items.push(this.city);
  }

  //Define que deve gerar o alerta
  showAlert = true;
  
  //Sai da tela de detalhes da cidade
  public exitPage(){
    this.showAlert = false;
    this.navCtrl.pop();
  }

  //Gera alerta informando que ocorreu um erro ao exlcuir a cidade
  public errorAlert(){
    let alert = this.alertCtrl.create({
      title: `Não foi possível excluir a cidade!`,
      subTitle: `Não possível excluir a cidade ${this.city.name}!`,
      buttons: ['OK']
    });
    alert.present();
  }

  //Chama o método deleteCity presente no DAO e realiza a exclusão da cidade.
  deleteCity(){
    if (this.showAlert){
      let response = this.alertCtrl.create({
        title: `Deseja Removar a  cidade ${this.city.name}`,
        message:"Você tem certeza?",
        buttons:[
          {
            text:'Sim',
            handler:() => {
              this.cityDAO.deleteCity(this.city)
              .then( () =>{
                this.exitPage();
              })
              .catch( () => {

              });
            }
          },
          {
            text:'Não',
            handler: () => {
            }
          }
        ]
      });  
      response.present();
      return false;
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Não há cidades a excluir!',
        subTitle: 'Não há cidades a excluir!',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  
}
