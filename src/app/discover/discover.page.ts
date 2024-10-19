import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage-angular'; 
import { Observable } from 'rxjs';
//import {DataserviceService} from '.././dataservice.service';
import {FirestoreService} from '.././firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor(public storage:Storage,
    public fs: FirestoreService, private activatedRoute: ActivatedRoute,
    public fst: AngularFirestore) {
      //this.Interest= this.fs.getInterest();
     }

  ngOnInit() {

  }

}
