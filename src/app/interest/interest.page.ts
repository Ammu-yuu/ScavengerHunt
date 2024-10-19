import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage-angular'; 
import { Observable } from 'rxjs';
//import {DataserviceService} from '.././dataservice.service';
import {FirestoreService} from '.././firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { fstat, FSWatcher } from 'fs';
import { ActivatedRoute, Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.page.html',
  styleUrls: ['./interest.page.scss'],
})
export class InterestPage implements OnInit {
  public Interest: Observable<any[]> ;
  public tourInterests = [];
  public ids =[];
  public schid;
  public user = "XIrt7xnF1ecNUwvuSol4CDXJ5Zg1" ;
  constructor(public storage:Storage,private activatedRoute: ActivatedRoute, public router: Router,
    public fs: FirestoreService,  public menuCtrl: MenuController,
    public fst: AngularFirestore) {

      this.fs.getInterest().subscribe(value =>{
        for (let i of value){
          i['selection'] = false;
        }
        this.tourInterests = value;
        //console.log("ammu",this.tourInterests);
      });
     console.log("Selected interests", this.tourInterests);
     }

  ngOnInit() {
    this.schid = this.activatedRoute.snapshot.paramMap.get('schid');
    console.log(" the  schedule id", this.schid);
  }
  val(id: string, i){
    this.tourInterests[i].selection = !this.tourInterests[i].selection;
    if (this.tourInterests[i].selection){
      this.ids.push(id);
    }
    else {
      const index = this.ids.indexOf(id);
      if (index > -1) {
        this.ids.splice(index, 1);
      }
    }
    return this.ids;
  }

  sendids(){
    console.log("ammu",this.ids);
    this.router.navigate(['/touristspot/ids', this.schid], {
      queryParams: {
        prop: JSON.stringify(this.ids)
      }
    });
  }
  sendback(){
    this.router.navigate(['/enterdetails', this.user]);
  }
}
