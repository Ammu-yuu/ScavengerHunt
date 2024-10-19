import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage-angular'; 
import { Observable } from 'rxjs';
import {FirestoreService} from '.././firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { fstat, FSWatcher } from 'fs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
public schedule = [];
public notexist = false;
public user = "XIrt7xnF1ecNUwvuSol4CDXJ5Zg1" ;
  constructor(public storage:Storage,private activatedRoute: ActivatedRoute, public router: Router,
    public fs: FirestoreService,
    public fst: AngularFirestore) {

      this.fs.getUserSchedule(this.user).subscribe(value =>{
        for (let i of value){
          if (value != null){
            i['exist'] = true;
            //value.push(i["exist"]=false);
          }
        }
        console.log("checkval", value);
        //this.schedule.push(value);
        this.schedule=value;
        //console.log("ammu",this.schedule);
      });
     //console.log("i wanna see", this.schedule);
     }

  ngOnInit() {
    
  }
  createschedule(){
    this.router.navigate(['/enterdetails', this.user]);
  }
  create(i){
    console.log("ammu", !this.schedule[i].exist);
    if (!this.schedule[i].exist==true){
      this.router.navigate(['/enterdetails', this.user]);
    }
    else {
      this.router.navigate(['/enterdetails', this.user]);
    }
  }

}
