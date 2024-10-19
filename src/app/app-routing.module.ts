import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "welcome",
    loadChildren: () =>
      import("./welcome/welcome.module").then((m) => m.WelcomePageModule),
  },
  {
    path: "interest/:schid",
    loadChildren: () =>
      import("./interest/interest.module").then((m) => m.InterestPageModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
      //canActivate: [AuthGuard],
  },

  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
     //canActivate: [AuthGuard],
  },
  {
    path: "favorite",
    loadChildren: () =>
      import("./favorite/favorite.module").then((m) => m.FavoritePageModule),
  },
  {
    path: "checkout",
    loadChildren: () =>
      import("./checkout/checkout.module").then((m) => m.CheckoutPageModule),
  },
  {
    path: "confirm",
    loadChildren: () =>
      import("./confirm/confirm.module").then((m) => m.ConfirmPageModule),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: "change-password",
    loadChildren: () =>
      import("./change-password/change-password.module").then(
        (m) => m.ChangePasswordPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "account",
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountPageModule),
  },

  {
    path: "enterdetails/:ids",
    loadChildren: () =>
      import("./enterdetails/enterdetails.module").then(
        (m) => m.EnterdetailsPageModule
      ),
  },
  {
    path: "touristspot/:ids/:schid",
    loadChildren: () =>
      import("./touristspot/touristspot.module").then(
        (m) => m.TouristspotPageModule
      ),
  },
  {
    path: "view-schedule/:tourId/:schid",
    loadChildren: () =>
      import("./view-schedule/view-schedule.module").then(
        (m) => m.ViewSchedulePageModule
      ),
  },
  {
    path: "discover",
    loadChildren: () =>
      import("./discover/discover.module").then((m) => m.DiscoverPageModule),
  },
  {
    path: "tourist-spot-main/:id",
    pathMatch: "prefix",
    loadChildren: () =>
      import("./tourist-spot-main/tourist-spot-main.module").then(
        (m) => m.TouristSpotMainPageModule
      ),
  },
  {
    path: "item-details/:id",
    pathMatch: "prefix",
    loadChildren: () =>
      import("./item-details/item-details.module").then(
        (m) => m.ItemDetailsPageModule
      ),
  },
   {
    path: 'uploadimage',
    loadChildren: () => import('./uploadimage/uploadimage.module').then( m => m.UploadimagePageModule)
  },
  {
    path: "**",
    loadChildren: () =>
      import("./page-not-found/page-not-found.module").then(
        (m) => m.PageNotFoundPageModule
      ),
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
