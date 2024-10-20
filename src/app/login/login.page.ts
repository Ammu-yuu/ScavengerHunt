import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  imports: [
    FormsModule,
    ReactiveFormsModule
]
  validationUserMessage ={
    email:[
      {type:"required", message:"Please enter your Email"},
      {type:"pattern", message:"The Email entered is Incorrect.Try again"}
    ],
    password:[
      {type:"required", message:"please Enter your Password!"},
      {type:"minlength", message:"The Password must be at least 5 characters or more"}

    ]
  }

  validationFormUser: FormGroup;

  constructor(public formbuider: FormBuilder, 
    public authservice: AuthService,
    private router: Router
    , private firestore: AngularFirestore, 
    private nav: NavController,
    ) { 
  
    }

  ngOnInit() {



  this.validationFormUser = this.formbuider.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ]))
  })

  }

LoginUser(value){
  console.log("Am logged in");
  try{
     this.authservice.loginFireauth(value).then( resp =>{
       console.log(resp);
 
     if(resp.user){

       this.authservice.setUser({
         username : resp.user.displayName,
         uid: resp.user.uid
       })

      const userProfile = this.firestore.collection('users').doc(resp.user.uid);

       userProfile.get().subscribe( result=>{

        if(result.exists){
          this.nav.navigateForward(['home']);
        }else{

          this.firestore.doc(`users/${this.authservice.getUID()}`).set({
            name: resp.user.displayName,
            email: resp.user.email
          });

           this.nav.navigateForward(['uploadimage']);
        }
       })
     }
  
       
     })
  }catch(err){
    console.log(err);
  }
}

}
