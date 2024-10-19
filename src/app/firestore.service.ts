import { Injectable } from '@angular/core';
import { AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument, 
  DocumentReference } from '@angular/fire/firestore';
  import firebase from 'firebase';

  import 'firebase/auth';
  import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router'; 
import { ControlContainer } from '@angular/forms';
import { promise } from 'protractor';
import { EmptyExpr } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public interest: Observable <any[]>;
  public ids=[];
  public TourInterest: Observable <any[]>;
  public TourInterestCollectionRef:AngularFirestoreCollection<any>;
  public TouristSpot: Observable <any[]>;
  public MTouristSpot: Observable <any[]>;
  public TouristSpotCollectionRef:AngularFirestoreCollection<any>;
  public Users: Observable <any[]>;
  public UserCollectionRef:AngularFirestoreCollection<any>;
  public Schedule: Observable <any[]>;
  public ScheduleCollectionRef:AngularFirestoreCollection<any>;
  public Days: Observable <any[]>;
  public DaysCollectionRef:AngularFirestoreCollection<any>;


  constructor(private afs: AngularFirestore, public activatedRoute: ActivatedRoute) {
    this.TourInterestCollectionRef = this.afs.collection('Interest');
    //this.interest = this.interestCollectionRef.valueChanges();
    this.TourInterest=this.TourInterestCollectionRef.snapshotChanges().pipe(
      map(actions=> {
        return actions.map(a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return {id, ...data};
        });
      })
    );
    this.TouristSpotCollectionRef = this.afs.collection('TouristSpots');
    this.TouristSpot=this.TouristSpotCollectionRef.snapshotChanges().pipe(
      map(actions=> {
        return actions.map(a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return {id, ...data};
        });
      })
    );

    this.UserCollectionRef = this.afs.collection('users');
    this.Users=this.UserCollectionRef.snapshotChanges().pipe(

      map(actions=> {
        return actions.map(a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return {id, ...data};
        });
      })
    );

    this.ScheduleCollectionRef = this.afs.collection('schedule');
    this.Schedule=this.ScheduleCollectionRef.snapshotChanges().pipe(
  //     // res.forEach((ele) => {
  //     //   console.log(ele.payload.val());
  //     //   tempArray.push(ele.payload.val())
  //     // });
  //     // this.TouristSpot = tempArray;
  //     // console.log(this.TouristSpot);
  //   //})
  //   this.TouristSpotCollectionRef = this.afs.collection('/TouristSpots', ref => ref.where('Iname', '==', culture));
  //   this.TouristSpot=this.TouristSpotCollectionRef.snapshotChanges().pipe(
  //     map(actions=> {
  //       return actions.map(a=> {
  //         const data = a.payload.doc.data();
  //         const id = a.payload.doc['id'];
  //         return {id, ...data};
  //       });
  //     })
  //   );
  //   return this.TouristSpot;
  // }
//return this.TouristSpot, this.MTouristSpot;
    // return this.TouristSpotCollectionRef.doc<any>(id).valueChanges().pipe(
    //   map(TouristSpot=>{
    //     TouristSpot.id = id;
    //     return TouristSpot;
    //   })
    // );

      map(actions=> {
        return actions.map(a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return {id, ...data};
        });
      })
    );
   }


   public getInterest(): Observable<any[]> { 
    return this.TourInterest;
  }

  public getUsers(): Observable<any[]> { 
    return this.Users;
  }
  public getMTouristSpot(): Observable<any[]> { 
    return this.TouristSpot;
  }

  public getTouristSpot(id: string): Observable<any[]> { 
    return this.TouristSpotCollectionRef.doc<any>(id).valueChanges().pipe(
      map(TouristSpot=>{
        TouristSpot.id = id;
        return TouristSpot;
      })
    );
  }
 
  public getIntTour(Name: string): Observable<any[]>{
    return this.TouristSpotCollectionRef.doc<any>(Name).valueChanges().pipe(
      map(TouristSpot=>{
        TouristSpot.Iname = Name;
        return TouristSpot;
      })
    );
  }

  public getDays(id: string, i){
    var scheduleRef = this.afs.collection("schedule");
    this.DaysCollectionRef = scheduleRef.doc(id).collection("Day" + i); 
    this.Days=this.DaysCollectionRef.snapshotChanges().pipe(
      map(actions=> {
        return actions.map(a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    return this.Days;
  }

  async updateDays(schid: string, Dayi, newSpot, dayid){
    var scheduleRef = this.afs.collection("schedule");
    this.DaysCollectionRef = scheduleRef.doc(schid).collection("Day" + Dayi, ref=>ref.orderBy('Spot')); 
    var DaysCollection = scheduleRef.doc(schid).collection("Day" + Dayi);
  
    var docRef = await this.DaysCollectionRef.doc(dayid);
    await docRef.get().toPromise().then((resDoc)=>{
      //console.log("end",resDoc.data().Date);
      let x = resDoc.data();
      const { Spot  = null } = x; 
      const spot = "Spot";
      if(Object.keys(resDoc.data()).find(v => v.includes(spot))){
        console.log("okay");
        //DaysCollection.doc(dayid).update(newSpot);
        return;
      }
      else{ 
        console.log("this might work");
        DaysCollection.doc(dayid).update(newSpot);
      }
        // if(Object.keys(resDoc.data()).includes("Spot")){
        //   DaysCollection.doc(dayid).update(newSpot);
        // }
    })
  }
  
  public getSpot(id :string){
    this.TouristSpotCollectionRef = this.afs.collection('TouristSpots', ref => ref.where('Iname', '==', id));
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
  public getUserSchedule(id :string){
    this.ScheduleCollectionRef = this.afs.collection('schedule', ref => ref.where('uId', '==', id));
    this.Schedule=this.ScheduleCollectionRef.snapshotChanges().pipe(
      map(actions=> {
        return actions.map(a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return {id, ...data};
        });
      })
    );
    return this.Schedule;
  }
  public getSchedule(id: string): Observable<any[]> { 
    return this.ScheduleCollectionRef.doc<any>(id).valueChanges().pipe(
      map(Schedule=>{
        Schedule.id = id;
        return Schedule;
      })
    );
    // this.TouristSpot=this.TouristSpotCollectionRef.snapshotChanges().pipe(
    //   map(actions=> {
    //     return actions.map(a=> {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc['id'];
    //       return {id, ...data};
    //     });
    //   })
    // );
  }
}

