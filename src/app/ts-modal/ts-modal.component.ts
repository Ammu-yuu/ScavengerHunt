import { Component, Input } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Storage} from '@ionic/storage-angular'; 
import { Observable } from 'rxjs';
import {FirestoreService} from '.././firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-ts-modal',
  templateUrl: './ts-modal.component.html',
  styleUrls: ['./ts-modal.component.scss'],
})
export class TsModalComponent {
  @Input() name: string;

  TouristSpot: any;
  modalTitle: string;
  modelId: number;

  constructor(private navParams: NavParams, public storage:Storage,
    public fs: FirestoreService,
    public fst: AngularFirestore, private modalCtrl: ModalController) {
      console.log(navParams.get('name'));
      this.TouristSpot = navParams.get("TouristSpots");
     }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }
  dismissModal(){
    this.modalCtrl.dismiss();
  }

}
