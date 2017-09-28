import { Storage } from '@ionic/storage';
import { OpenWeatherCity } from './../../model/OpenWeatherCity.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CityProvider {

  constructor(public storage: Storage, public http: Http) {
  }

  //Deleta Cidade
  public deleteCity(city: OpenWeatherCity): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      var contador = 0;
      //Pega cidades do banco
      this.getCities()
        .then((cidades) => {
          //Encontra cidade a ser deletada do array
          for (let cidadeExcluida of cidades) {
            if (cidadeExcluida === city.id) {
              cidades.splice(contador, 1);
            }
            contador++;
          }
          //Reinsere dados sem a cidade excluída
          this.storage.set("cities", cidades);
        })
        .then(() => {
          //Retorna True
          resolve(true);
        })
        .catch(() => {
          //Retorna False
          resolve(false);
        });
    });

  }

  //Pega cidades do banco
  public getCities(): Promise<any> {
    return new Promise<OpenWeatherCity>((res) => {
      this.storage.get("cities")
        .then((cidades) => {
          //Retorna cidades
          res(cidades);
        })
        .catch(() => {
          //Retorna Null
          res(null);
        })
    });
  }

  //Salva dados
  public saveCity(code: number): Promise<boolean> {
    var retorno: boolean;
    var cidades = [];
    return new Promise<boolean>((resolve) => {
        this.getCities()
        .then((cidade) => {
          //Atribui cidades  ao array
          cidades = cidade || [];
          cidades.push(code);

          //Salva os dados no banco
          this.storage.set("cities", cidades)
            .then(() => {
              retorno = true;
            })
            .catch(() => {
              retorno = false;
            });

          //Retorna dados
          resolve(retorno);
        });
    });
  }
}
