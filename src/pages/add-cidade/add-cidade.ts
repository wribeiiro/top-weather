import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-add-cidade',
  templateUrl: 'add-cidade.html',
})
export class AddCidadePage {

  city: string;

  constructor(public navCtrl: NavController, public navParams: NavParams , public storage: Storage ,  public alertCtrl: AlertController) {
  }


  showAlert = true;

  public exitPage(){
    this.showAlert = false;
    this.navCtrl.pop();
  }
  
  cidades;

  saveCity(){  
    this.storage.get("cidades").then( (cidade) => {
      this.cidades =  cidade || [];
      console.log(cidade);
      this.cidades.push(this.city);
      console.log(this.cidades);

    if (this.city.length > 0){
      this.storage.set("cidades",this.cidades);
      if (this.showAlert){
        let response = this.alertCtrl.create({
          title: 'Deseja Adicionar uma nova cidade?',
          message:"Você tem certeza?",
          buttons:[
            {
              text:'Sim',
              handler:() => {
                this.city = null;
              }
            },
            {
              text:'Não',
              handler: () => {
                this.exitPage();
              }
            }
          ]
        });  
        response.present();
        return false;
      }
    } 
    else {
      let alert = this.alertCtrl.create({
        title: 'Insira uma cidade!',
        subTitle: 'Para adicionar uma cidade é necessário inserir o nome da mesma!',
        buttons: ['OK']
      });
      alert.present();
    }
    });
  }
  


}
