import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any;
  profileName: any;
  profileImageUrl: any;
  profileEmail: any;
  profileBD: any;

  constructor(private database : AngularFirestore,private authservice: AuthService) {
    firebase.auth().onAuthStateChanged(user => {
      console.log("AUTH_USER", user);

      if (user) {
        const result = this.database.doc(`users/${this.authservice.getUID()}`);
        var userprofile = result.valueChanges();
        userprofile.subscribe(profile => {
          console.log("PROFILE::", profile);
           this.profileName = profile['name'];
           this.profileImageUrl = profile['photoUrl'];
           this.profileEmail = profile['email'];
           this.profileBD = profile['birthdate'];
        })
      }
    })
   }

  ngOnInit() {
   
  
    
  }


}
