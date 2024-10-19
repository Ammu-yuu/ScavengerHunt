import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; 
import {Storage} from '@ionic/storage'; 
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {FirestoreService} from '../firestore.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  public id;
  public TouristSpot;
  public Interest;
  public TouristSpotCollectionRef: AngularFirestoreCollection<any>;

  constructor( public activatedRoute: ActivatedRoute, 
    public fs: FirestoreService, public fst: AngularFirestore
  ) { }

  ngOnInit() {
   // console.log('check', this.activatedRoute.snapshot.paramMap.get('id'));
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
         this.TouristSpot = this.fs.getTouristSpot(this.id).subscribe(TouristSpot=> {
            this.TouristSpot = TouristSpot;
          });
         //return this.TouristSpot;
    //console.log('love',this.TouristSpot);
  }
}
