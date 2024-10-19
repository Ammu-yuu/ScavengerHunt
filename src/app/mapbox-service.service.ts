import { Injectable, NgZone } from '@angular/core';
import {map} from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import * as mapboxgl from 'mapbox-gl';
import { from, Observable } from 'rxjs';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
declare var google: any;
//import {} from '@types/googlemaps'; 
//import { GoogleMapsAPIWrapper } from ;
//import { MapsAPILoader } from 'angular2-google-maps/core';


const httpOptions = {
  headers:
  new HttpHeaders (
  {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8100",
    
  }),
  withCredentials: true,
};
// export interface MapboxOutput {
//   attribute: string;
//   features: Feature[];
//   query:[];
// }

// export interface Feature{
//   place_name: string;
// }

@Injectable({
  providedIn: 'root'
})
export class MapboxServiceService {
  constructor(private http: HttpClient, private wrapper: GoogleMapsAPIWrapper) {
   }

   url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric';
   key = 'your api key';
 
   latitude = 26.09896;
   longitude = 50.5054949;
 
   async callDistance(Slat, Slong, Endlat,Endlong, ){
     return await this.http.get(`${this.url}&origins=${Slat},${Slong}&destinations=${Endlat},${Endlong}&key=${this.key}`, httpOptions);
   }
 
   // Get Current Location Coordinates
   private setCurrentLocation() {
     if ('geolocation' in navigator) {
       navigator.geolocation.getCurrentPosition((position) => {
         this.latitude = position.coords.latitude;
         this.longitude = position.coords.longitude;
       });
     }
   }
}
