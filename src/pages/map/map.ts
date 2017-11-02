import { OpenWeatherCity } from './../../model/OpenWeatherCity.model';
import { CityServiceProvider } from './../../providers/city-service/city-service';
import { LatLng } from './../../model/LatLng.model';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: any;
  lng: any;
  marker: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geoLocation: Geolocation, public latLng: LatLng, public cityServ: CityServiceProvider
  ) {
  }

  getLocal(): Promise<LatLng> {
     let coords: LatLng = new LatLng();
    return new Promise((resolve) => {
      this.geoLocation.getCurrentPosition().
        then((res) => {         
          coords.lat = res.coords.latitude; 
          coords.lng = res.coords.longitude;
          resolve(coords);
        })
        .catch( (err) => {
          //console.log(err);
        });
    });
  }


  loadMap(coords: LatLng) {
    let coordinates = new google.maps.LatLng(coords.lat, coords.lng);
    let options = {
      center: coordinates,
      zoom: 15,
      mapTypeControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, options);
    
  }

  generateMarker(open: OpenWeatherCity, latLng: LatLng) {
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(latLng.lat, latLng.lng),
      title: 'Posição atual'
    });
  }



  markPosition(open: OpenWeatherCity, latLng: LatLng){
    let content = ` <p> Você está em ${open.name} </p> 
                    <p> A temperatura está ${open.temp} </p>
                    <p> A Pressão do ar está ${open.pressure} </p> 
                    <button ion-button (click)="save(${open})"> Salvar </button>`;

    let info = new google.maps.InfoWindow({
      content: content
    });

    this.generateMarker(open , latLng);


    info.open(this.map , this.marker);
  }

  getCity() {
    this.getLocal().
      then((res) => {
        this.cityServ.loadWeatherByLatLng(res)
          .then((response) => {
            this.loadMap(res);
            this.markPosition(response , res);
          })
      })
  }

  ionViewWillEnter() {
    this.getCity();
  }

  save(open: OpenWeatherCity){
    console.log(open);
  }


}
