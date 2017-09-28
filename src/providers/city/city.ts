import { Storage } from '@ionic/storage';
import { OpenWeatherCity } from './../../model/OpenWeatherCity.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CityProvider {

  constructor(public storage: Storage, public http: Http) {

  }

  public getList(): Promise<OpenWeatherCity[]> {
    return this.storage.ready().then((localForage: LocalForage) => {
      let open: OpenWeatherCity[] = [];


      return this.storage.forEach((openW: OpenWeatherCity, key: string, iterationNumber: number) => {
        if (key.indexOf('cities') > - 1) {
          open.push(openW);
        }
      }).then(() => open);
    });
  }

  public getByCode(code: number): Promise<OpenWeatherCity> {
    return this.storage.get(`cities.${code}`);
  }

  public saveCity(code: number): Promise<boolean> {
    var retorno: boolean;
    var cidades = [];
    return new Promise<boolean>((resolve) => {
      this.storage.get("cities")
      .then((cidade) => {
        cidades = cidade || [];
        cidades.push(code);
  
        this.storage.set("cities", cidades)
          .then(() => {
            retorno = true;
          })
          .catch(() => {
            retorno = false;
          });
  
        resolve(retorno);
      });
    });
  }
}
