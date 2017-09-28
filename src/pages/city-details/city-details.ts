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


  constructor(public navCtrl: NavController, public navParams: NavParams , public storage: Storage, public alertCtrl: AlertController) {
    var city = this.navParams.get("city");
    this.items.push(city);
  }

  showAlert = true;
  
  public exitPage(){
    this.showAlert = false;
    this.navCtrl.pop();
  }


  deleteCity(city){
    if (this.showAlert){
      let response = this.alertCtrl.create({
        title: `Deseja Removar a  cidade ${city.name}`,
        message:"Você tem certeza?",
        buttons:[
          {
            text:'Sim',
            handler:() => {
              var contador = 0;
              this.storage.get("cidades").then( (cidades) => {
                for (let cidadeExcluida of cidades){
                  if (cidadeExcluida === city.name){
                    cidades.splice(contador, 1);
                  }
                  contador++;
                }
                this.storage.set("cidades",cidades);
              });
              this.exitPage();
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
