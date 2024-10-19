import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage-angular'; 
import { from, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, take, mergeMap } from 'rxjs/operators';
import {FirestoreService} from '.././firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { DataService } from '../data.service';
import {AuthService} from '../services/auth.service';
import {  MenuController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import * as firebase from 'firebase/app'; 
import 'firebase/firestore';
import { TranslationWidth } from '@angular/common';
import { connectStorageEmulator } from '@firebase/storage';
// import { MapboxServiceService } from '../mapbox-service.service';
// import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.page.html', 
  styleUrls: ['./view-schedule.page.scss'],
})


export class ViewSchedulePage implements OnInit {
 
  public Schedule: Observable <any[]>;
  public day: Observable <any[]>;
  public tourSchedule= [];
  public Days  = <any[]> [];
  public DaysInfo  = <any[]> [];
  public tourId;
  public lat = <any>[];
  public long = <any>[];
  public schid;
  public daysRef;
  public location;
  public loc = <any>[];
  public tourSpot = <any> [];
  public DaySelect="assets/icon/day-back.jpeg";
  public DayUSelect="assets/icon/back-select.jpg";
  public noOfDays;
  public TouristSpot = <any[]> [];
  public Date;
  public activeDay;
  public da;
  user = "3q2Tf1V4AnPRFXoK1692LXhbws62" ;
  constructor(public storage:Storage,
    private activatedRoute: ActivatedRoute, 
    private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation,
    public fs: FirestoreService, private data: DataService,  private auth: AuthService,  public menuCtrl: MenuController,
    public fst: AngularFirestore) { 
      this.menuCtrl.enable(false);
    }

  ngOnInit() {
  
    this.schid = this.activatedRoute.snapshot.paramMap.get('schid');
    this.activatedRoute.queryParams.subscribe(params => {
      var val = JSON.parse(params.prop);
      this.tourId = val;
      return this.tourId;
    })  
    console.log("the tourId", this.tourId);
    console.log("the schedule id", this.schid);
    var DS = "assets/icon/day-back.jpeg";
    this.fs.getSchedule(this.schid).subscribe(value =>{
      for (let i=1; i <= value['NoOfDays']; i++){
        this.Days.push(i);
      } 
      //let x = value['NoOfDays'];
      //this.noOfDays = x;
      //this.addSpot(this.noOfDays);
      //console.log("hibhibhib",this.noOfDays);
      return this.Days;
    })
    // for (let k=0; k<this.tourId.length; k++){
    //   var newSpot  
    //  }
    for (let k=0; k<this.tourId.length; k++){
      var newSpot = { ["Spot"+ (k+1)] : this.tourId[k] }
     }
     this.fs.getSchedule(this.schid).subscribe(value =>{ 
      for (let i=1; i <= value['NoOfDays']; i++){
        
      //  this.fs.updateDays(this.schid, i, newSpot, value['id']);
       this.fs.getDays(this.schid, i).subscribe(value =>{
          for (let j of value){
           j['Selected'] = true;
         }
        this.DaysInfo.push(...value);
       })
      } 
      return this.DaysInfo;
    });
    this.fs.getSchedule(this.schid).subscribe(value =>{
      for (let i=1; i <= value['NoOfDays']; i++){
      //  this.fs.updateDays(this.schid, i, newSpot, value['id']);
       this.fs.getDays(this.schid, i).subscribe(value =>{
          for (let j of value){
            for (let k=0; k<this.tourId.length; k++){
              var newSpot = { ["Spot"+ (k+1)] : this.tourId[k] };
              //console.log("the Id",i,  j['id']) ;
              this.fs.updateDays(this.schid, i, newSpot, j['id']);
            }
         }
       })
      } 
      return this.DaysInfo;
    });

    console.log("the days total ammu", this.DaysInfo);
    //console.log("the days total", this.Days.length);
    this.getLatLong();
   // this.addSpot();
  }
  getLatLong(){
    for(let i=0; i<this.tourId.length;i++){
      this.fs.getTouristSpot(this.tourId[i]).subscribe((val)=>{
        this.loc.push(val['location']);
        var array = val['location'].split(',');
        var la=array[0];
        var lo=array[1];
        this.lat.push(la);
        this.long.push(lo);
        return this.loc, this.long, this.lat;
      });
    }
    // console.log("outside lat long",this.lat, this.long);
    // console.log("location", this.loc);
  }
  addSpot(days){
    //console.log("outside lat long",this.lat, this.long);
    var collect = this.fst.collection("schedule").doc(this.schid);
  
  }

  changeDay(i){
    //console.log("check", this.DaysInfo[i].Selected);
    this.DaysInfo[i].Selected = true;
    for (let x = 0; x < Object.keys(this.DaysInfo).length; x++){
      if(x!=i){
        this.DaysInfo[x].Selected = false;
      }
    }
    var Spot = 'Spot';
    var resultObj = [];
    var m = Object.keys(this.DaysInfo[i]);
    m.forEach((keyName)=>{
      if(keyName.includes(Spot)){
        resultObj.push(this.DaysInfo[i][keyName]);
      }
    })
    if (this.TouristSpot.length !== 0){
      this.TouristSpot.splice(0, this.TouristSpot.length);
    }
    for(let y=0; y<resultObj.length; y++){
      this.fs.getTouristSpot(resultObj[y]).subscribe(val=>
      this.TouristSpot.push(val)
      );
    }
    
    console.log("the spots", this.TouristSpot);
    return this.TouristSpot;
  }
  display(date, id, index){
    this.Date = date;
    this.activeDay = id;
    this.da = index;
   
    //console.log("thisid", this.activeDay);
  }
   delete(i){
    var day = 'Day'+this.da;
    var DayRef =  this.fst.collection("schedule").doc(this.schid).collection(day).doc(this.activeDay);
    let res = DayRef.update({
      ['Spot'+i]: null
    });
    // DayRef.update({
    //     ['Spot'+i]: this.fst.firestore['_firebaseApp'].firebase_.firestore.FieldValue.delete()
    // });
  }
  move(id, i){

  }
}
