import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSelect, LoadingController, ToastController } from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { AngularFirestoreCollection } from "@angular/fire/firestore";
import { map, take, mergeMap } from "rxjs/operators";
import { DateTime } from "luxon";
@Component({
  selector: "app-enterdetails",
  templateUrl: "./enterdetails.page.html",
  styleUrls: ["./enterdetails.page.scss"],
})
export class EnterdetailsPage implements OnInit {
  public SDate: Date;
  public EDate: Date;
  public people: Number;
  public budget: Number;
  public days: any;
  public userid;
  public sch;
  public daysBetweenDates;
  public email = "ammuraez99@gmail.com";
  public UserCollectionRef: AngularFirestoreCollection<any>;
  public user: Observable<any[]>;
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private activatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.userid = this.activatedRoute.snapshot.paramMap.get('ids');
    // console.log("check user", this.userid); 
  }
 async addDetails() {
    var usersRef = this.afs.collection("users").doc(this.userid).collection("details");
    var NewDetails = {
      SDate: this.SDate,
      EDate: this.EDate,
      people: this.people,
      budget: this.budget,
  }
    const { id } = await usersRef.add(NewDetails);
    console.log(typeof this.SDate);
    let date1 = new Date(this.SDate);
    let date2 = new Date(this.EDate);
    let timeInMilisec = date2.getTime() - date1.getTime();
    let daysBetweenDates = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
    console.log(daysBetweenDates);
    var NewSchedule = {
      NoOfDays : daysBetweenDates, 
      uId : this.userid,
      detailsId: id,
   }
   this.addSchedule(NewSchedule, daysBetweenDates, this.SDate);
    // usersRef.doc(detailsId).set({
    //     SDate: this.SDate,
    //     EDate: this.EDate,
    //     people: this.people,
    //     budget: this.budget,
    //   })
    //   .then(function () {
    //     console.log("Document Added ");
    //   })
    //   .catch(function (error) {
    //     console.error("Error adding document: ", error);
    //   });
      
  }

  async addSchedule(newSchedule, days, SDate) {
    const { id } = await this.afs.collection("schedule").add(newSchedule);
    //console.log("the new schedule id:", id);
    var scheduleRef = this.afs.collection("schedule");
    for (let i=1; i <= days; i++){
        var daysRef = scheduleRef.doc(id).collection("Day" + i);
        var dayId;
        daysRef.doc(dayId).set({
          Date: DateTime.fromJSDate(new Date(SDate)).plus({ days: i-1}).toFormat("DDDD"),
        }).then(function () {
          console.log("Document Added ");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      }
      let schid = id;
      this.router.navigate(['/interest', schid]);
  }
}
