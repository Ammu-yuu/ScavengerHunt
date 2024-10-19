import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage-angular'; 
import { from, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, mergeMap } from 'rxjs/operators';
import {FirestoreService} from '.././firestore.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ModalController} from '@ionic/angular';
import { TsModalComponent } from '../ts-modal/ts-modal.component';
import {  MenuController } from '@ionic/angular';


@Component({
  selector: 'app-touristspot',
  templateUrl: './touristspot.page.html',
  styleUrls: ['./touristspot.page.scss'],
})
export class TouristspotPage implements OnInit {
  public TouristSpot: Observable <any[]>;
  public TouristSpots = <any[]> [];
  public tourId=[];
  public TouristSpotCollectionRef:AngularFirestoreCollection<any>;
  modelData: any;
  navCtrl: any;
  public ids;
  public items=[];
  public schid; 
  constructor(public storage:Storage,
    private activatedRoute: ActivatedRoute, public router: Router,  public menuCtrl: MenuController,
    public fs: FirestoreService,
    public fst: AngularFirestore, private modalCtrl: ModalController) {
  
     } 

  ngOnInit() {
    this.schid = this.activatedRoute.snapshot.paramMap.get('schid');
    this.activatedRoute.queryParams.subscribe(params => {
      var val = JSON.parse(params.prop);
      this.ids = val;
      return this.ids;
    })   

    for(var i=0; i < this.ids.length; i++){
      from(this.fs.getSpot(this.ids[i])).pipe(
       mergeMap(((val:any)=>{
         for (let i of val){
          i['isSpotChecked'] = false;
        }
        this.TouristSpots.push(...val);
         return this.TouristSpots;})) ).subscribe((val)=>{
      })
    } 
    
    console.log("the tourist ", this.TouristSpots);
  }
  getSpot(id :string){
    this.TouristSpotCollectionRef = this.fst.collection('TouristSpots', ref => ref.where('Iname', '==', id));
    this.TouristSpot=this.TouristSpotCollectionRef.snapshotChanges().pipe(
      map(actions=> {
        return actions.map(a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return {id, ...data};
        });
      })
    );
    return this.TouristSpot;
  }
  async openModal(TouristSpot){
    const modal = await this.modalCtrl.create({
      component: TsModalComponent,
      componentProps: { 
        'TouristSpots': TouristSpot,
    }
    });
    return await modal.present();
  }
  showTouristSpot(TouristSpot) {
    this.navCtrl.push(TsModalComponent, TouristSpot);
  }
  SaveTour(id: string, i){
    console.log("ammu", this.TouristSpots[i]['isSpotChecked']);
    console.log("ammu", this.TouristSpots);
    if (this.TouristSpots[i]['isSpotChecked']==false){ 
      this.tourId.push(id);
      console.log("ammu", this.TouristSpots);
    }
    else {
      const index = this.tourId.indexOf(id);
      if (index > -1) {
        this.tourId.splice(index, 1);
      }
    }
    console.log("check tour", this.tourId);
    return this.tourId;
  }
  sendids(){
    //console.log("ammu",this.tourId);
    console.log("the schedule id", this.schid);
    this.router.navigate(['/view-schedule/tourId', this.schid], {
      queryParams: {
        prop: JSON.stringify(this.tourId)
      }
    });
  }
}
