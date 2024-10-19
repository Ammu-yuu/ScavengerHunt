import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage-angular'; 
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import {FirestoreService} from '.././firestore.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ModalController} from '@ionic/angular';
import { TsModalComponent } from '../ts-modal/ts-modal.component';

@Component({
  selector: 'app-tourist-spot-main',
  templateUrl: './tourist-spot-main.page.html',
  styleUrls: ['./tourist-spot-main.page.scss'],
})
export class TouristSpotMainPage implements OnInit {
  public TouristSpot: Observable<any>;
  public TouristSpotCollectionRef:AngularFirestoreCollection<any>;
  public Name;
  constructor(public storage:Storage,
    private activatedRoute: ActivatedRoute,
    public fs: FirestoreService,
    public fst: AngularFirestore) {
    
     }

  ngOnInit() {
    
    this.TouristSpot=this.getTSpot();

  }
  getTSpot(){
    this.Name = this.activatedRoute.snapshot.paramMap.get('id');
    this.TouristSpotCollectionRef = this.fst.collection('TouristSpots', ref => ref.where('Iname', '==', this.Name));
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
}

