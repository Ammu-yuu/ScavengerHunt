import { ForgotPasswordPage } from "../forgot-password/forgot-password.page";

export interface User {
   userID: string;
   userName: string;
   userEmail: string;
   userBirthdate: Date;
   userPassword: string;
   nationality:string; 
   createdAt: Date;

}
