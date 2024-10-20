import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators,  FormControl} from '@angular/forms'
import {AuthService} from 'src/app/services/auth.service';
import {AlertController, NavController,LoadingController} from '@ionic/angular'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  imports: [
    FormsModule,
    ReactiveFormsModule
  ]
   validationMessages = {
      names: [{type:"required", message:"Please Enter your Full Names"}],
      birthdate: [{type:"required", message:"Please Enter your Full Names"}],
      email: [
        {type: 'required',message:"Enter your Email Adress"},
        {type:"pattern", meesage:"Please the Email Entered is Incorrect. Try again.."}
      ],
      password: [
        {type: "required", message: "password is required here"},
        {type:"minlength", message: "Passwrd must be at least 6 character"}
      ]
   }

   ValidationFormUSer : FormGroup;
   loading:any;

  constructor(private router: Router,
     private navCtr: NavController ,
     private formbuilder:FormBuilder, 
     private authService: AuthService, 
     public loadingCtrl : LoadingController, 
     private alertCtrl: AlertController){
    this.loading = this.loadingCtrl

   }
   
  ngOnInit() {
  this.ValidationFormUSer = this.formbuilder.group({
    names: new FormControl('', Validators.compose([
       Validators.required
    ])),
    birthdate: new FormControl('', Validators.compose([
      Validators.required
   ])),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),

    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ]))

  })

  }

  registerUser(value){
   this.showalert();
    try{
   this.authService.userRegistration(value).then( response =>{
     console.log(response);
     if(response.user){
      response.user.sendEmailVerification();
       response.user.updateProfile({
         displayName: value.names,
         birthdate: value.birthdate,
         email: value.email,
       });
     this.loading.dismiss();
     this.router.navigate(['login']);
     }
   }, error=>{
     this.loading.dismiss();
     this.errorLoading(error.message);

   })
 }catch(erro){
   console.log(erro)
}
  }


  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:"Error Registering",
      message:message,
      buttons:[{
        text:'ok',
        handler: ()=>{
        this.navCtr.navigateBack(['signup'])
      }
      }]
    })
     await loading.present();
  }




  async showalert(){
 var load = await this.loadingCtrl.create({
   message:"please wait....",

 })
  load.present();
}

}
