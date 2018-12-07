import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SlickModule } from 'ngx-slick';
import { AgmCoreModule } from '@agm/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import {StickyModule} from 'ng2-sticky-kit';
import 'hammerjs';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { MaterialModule } from './material.module';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgAutoCompleteModule} from "ng-auto-complete";
import { ScrollToModule } from 'ng2-scroll-to-el';
import {  TruncatePipe }   from './app.pipe';
import { CurrencyMaskModule } from "ng2-currency-mask";


import {HttpModule} from '@angular/http';
import { CommonServiceService } from './services/common-service.service';
import { AlertService } from './services/alert.service';
import { ToastService } from './services/toast.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LegalComponent } from './legal/legal.component';
import { BlogComponent } from './blog/blog.component';
import { PriceYourHomeComponent } from './price-your-home/price-your-home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PostPropertyComponent } from './post-property/post-property.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PropertyListingsComponent } from './property-listings/property-listings.component';
import { PropertyListingDetailsComponent } from './property-listing-details/property-listing-details.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ProfileComponent } from './profile/profile.component';
import { PropertiesComponent } from './properties/properties.component';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { MessageService } from './blog/message.service';
import { BlogService } from './blog/blog.service';
import { AddPropertyComponent } from './add-property/add-property.component';
import { EqualValidator } from './sign-in/equal-validator.directive';




//lang

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StripeComponent } from './stripe/stripe.component';
import { AlertComponent } from './alert/alert.component';
import { SettingComponentComponent } from './setting-component/setting-component.component';

//import { CeiboShare } from 'ng2-social-share';   /* For Aot Build */
import {ShareButtonsModule} from 'ngx-sharebuttons';

import { ImageCropperModule } from 'ngx-image-cropper';
import { DragulaModule } from 'ng2-dragula';
import { ApprovePropertyComponent } from './approve-property/approve-property.component';
import { FavouritePropertiesComponent } from './favourite-properties/favourite-properties.component';
import { ProfileActivateComponent } from './profile-activate/profile-activate.component';

import { MetaModule } from 'ng2-meta';


import { SwiperModule } from 'ngx-swiper-wrapper';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { NgxPayPalModule } from 'ngx-paypal';
import { MySubscriptionComponent } from './my-subscription/my-subscription.component';

import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { GeneralComponentComponent } from './general-component/general-component.component';

import { AdsenseModule } from 'ng2-adsense';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { CityPropertyListingComponent } from './city-property-listing/city-property-listing.component';

/* For Aot Build */
import { BuyingComponent } from './buying/buying.component';
import { SellingComponent } from './selling/selling.component';
import { RentComponent } from './rent/rent.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { TutorialDetailComponent } from './tutorial-detail/tutorial-detail.component';
import { TutorialTypeComponent } from './tutorial-type/tutorial-type.component';
/* For Aot Build */

const routes:Routes = [
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'buy', component:BuyComponent},
    {path:'sell', component:SellComponent},
    {path:'privacy-policy', component:PrivacypolicyComponent},
    {path:'tutorial', component:HowItWorksComponent},
    {path:'legal', component:LegalComponent},
    {path:'blog', component:BlogComponent},
    {path:'details/:id', component:BlogDetailsComponent},
    {path:'price-your-home', component:PriceYourHomeComponent},
    {path:'sign-in', component:SignInComponent},
    {path:'forgot-password', component:ForgotPasswordComponent},
  

    {path:'property-listings', component:PropertyListingsComponent},
    /*{path:'property-listings/:type/:auto', component:PropertyListingsComponent},
    {path:'property-listings/:type/:auto/:prop', component:PropertyListingsComponent},
    {path:'property-listings/:type/:auto/:prop/:minPrc', component:PropertyListingsComponent},
    {path:'property-listings/:type/:auto/:prop/:minPrc/:maxPrc', component:PropertyListingsComponent}, */


  

    {path:'property-listing-details/:id', component:PropertyListingDetailsComponent},
    {path:'terms-conditions', component:TermsConditionsComponent},
    {path:'subscription', component:SubscriptionComponent},


    {path:'profile', component:ProfileComponent,canActivate: [CommonServiceService]},
    {path:'settings', component:SettingComponentComponent,canActivate: [CommonServiceService]},
    {path:'post-property', component:AddPropertyComponent},
    {path:'edit-property/:id', component:AddPropertyComponent,canActivate: [CommonServiceService]},
    {path:'properties', component:PropertiesComponent,canActivate: [CommonServiceService]},


	
    {path:'agent/:id', component:AgentDetailsComponent},
    {path:'owner/:id', component:AgentDetailsComponent},
    {path:'real-estate-pro/:id', component:AgentDetailsComponent},
    {path:'real-estate-company/:id', component:AgentDetailsComponent},
    {path:'project-developer/:id', component:AgentDetailsComponent},


    {path:'stripe', component:StripeComponent},
    {path:'approve-property/:id/:id2', component:ApprovePropertyComponent},
    {path:'profile-activate/:id/:id2', component:ProfileActivateComponent},
    {path:'reset-password/:id/:id2', component:ResetPasswordComponent},
    
    // new routes
    {path:'city-property-listing/:slug', component:CityPropertyListingComponent},
    {path:'tutorials', component:TutorialsComponent},
    {path:'tutorial-list/:slug', component:TutorialTypeComponent},
    {path:'tutorial-details/:slug', component:TutorialDetailComponent},

];

let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("939452810278-3185vn8qmdj3iucib186qon3jng6ba56.apps.googleusercontent.com")
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("263992847577660") // Inmopedia Production id
    }
]);  

/* For Aot Build */
export function provideConfig() {
    return config;
}
/* For Aot Build */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuyComponent,
    SellComponent,
    HowItWorksComponent,
    LegalComponent,
    BlogComponent,
    PriceYourHomeComponent,
    SignInComponent,
    PostPropertyComponent,
    ForgotPasswordComponent,
    PropertyListingsComponent,
    PropertyListingDetailsComponent,
    TermsConditionsComponent,
    SubscriptionComponent,
    ProfileComponent,
    PropertiesComponent,
    AgentDetailsComponent,
    BlogDetailsComponent,
    AddPropertyComponent,
    EqualValidator,
    StripeComponent,
    AlertComponent,
    SettingComponentComponent,
    //CeiboShare, /* For Aot Build */
    TruncatePipe,
    ApprovePropertyComponent,
    FavouritePropertiesComponent,
    ProfileActivateComponent,
    ResetPasswordComponent,
    MySubscriptionComponent,
    GeneralComponentComponent,
    PrivacypolicyComponent,
    CityPropertyListingComponent,
    /* For Aot Build */
    BuyingComponent, 
    SellingComponent,
    RentComponent,
    TutorialsComponent,
    TutorialDetailComponent,
    TutorialTypeComponent
    /* For Aot Build */
  ],
  imports: [
  SwiperModule,
  HttpModule,
    BrowserModule,
	FormsModule,
	AngularFontAwesomeModule,
	NgxGalleryModule,
	ReactiveFormsModule,
	StickyModule,
	MaterialModule,
	NgAutoCompleteModule,
    BrowserAnimationsModule,
	DragulaModule,
	SlickModule.forRoot(),
	BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
	RatingModule.forRoot(),
	TabsModule.forRoot(),
	CarouselModule.forRoot(),
	AccordionModule.forRoot(),
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule,
	AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBTefZ02bzSMrSkTH_EMUcw8Yis43Tx3II'
    }),
	RouterModule.forRoot(routes, {useHash: true}),
  HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    Ng4GeoautocompleteModule.forRoot(),
    ScrollToModule.forRoot(),
    ImageCropperModule,
    ShareButtonsModule.forRoot(),
    MetaModule.forRoot(),
    NgxPayPalModule,
    SocialLoginModule,   /* For Aot Build */
    AdsenseModule.forRoot({
      adClient: 'ca-pub-9616389000213823',
      adSlot: 7259870550,
    }),
    CurrencyMaskModule
  ],
  providers: [MessageService, BlogService, CommonServiceService, AlertService,ToastService,{ provide: AuthServiceConfig,useFactory: provideConfig }],
  exports: [BsDropdownModule, TooltipModule, ModalModule, RatingModule,MatSnackBarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
}



