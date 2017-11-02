import { Http } from '@angular/http';
import { Injectable, Component } from '@angular/core';

@Injectable()
export class LatLng { 
    lat:any;
    lng:any;


    public setLatLng(lat , lng){
        this.lat = lat ;
        this.lng = lng;
    }

    constructor(){
        
    }
}