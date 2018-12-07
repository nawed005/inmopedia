import { Component, OnInit , TemplateRef, ViewChild} from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Contact } from './contact';
import { FormControl } from '@angular/forms';


import { Router, NavigationStart , ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import { CommonServiceService } from '../services/common-service.service';

import { Property } from './property';

import { AlertService } from '../services/alert.service';
import {DomSanitizer} from '@angular/platform-browser';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


import { ShareButton, ShareProvider } from 'ngx-sharebuttons';
import { MetaService } from 'ng2-meta';

import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral} from '@agm/core';  // google map

@Component({
  selector: 'app-property-listing-details',
  templateUrl: './property-listing-details.component.html',
  styleUrls: ['./property-listing-details.component.css'],
})
export class PropertyListingDetailsComponent implements OnInit {

    modalRef: BsModalRef;
    public repoUrl = '';
    public imageUrl = '';
    is_fav:any;
    public other_character : any;
    public character_other : any;

    is_show_email_form=0;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    loginData:any;
    is_valid=0;
    sameProperty:any;
    is_show_phone=0;
    propertyId:number;
    propertyVcode:number;
    //propertyDetails= new Property('','','','', 1, '', '', '', '', '', '', '', '', '', '', '', '', '', 1, '', '', '', '', '', 1, 1, 1, 1, '',[],'','','');
    
    /* For AOT Build*/
    propertyDetails= new Property('','','','', 1, '', '', '', '', '', '', '', '', '', '', '', '', '', 1, '', '', '', '', '', 1, 1, 1, 1, '',[],'','','','','','','','','');
    public email:string;
    public shareBox: any;
    
    settingData:any;
    //fbButton:any;
    //lnButton:any;
	AllLanguage:any;
	name:string;
  video: any = {id: 'wzrnuUOoFNM'};
  baseUrl:string = 'https://www.youtube.com/embed/';
  urls:any=[];
  
  @ViewChild('AgmMap') agmMap: AgmMap;  // google map
  zoom: number = 8;  // google map
  
  
    constructor(private sanitizer: DomSanitizer, public commonService: CommonServiceService,private route : ActivatedRoute,private _router: Router, private alertService: AlertService,private modalService: BsModalService,private metaService: MetaService) {

       this.loginData=JSON.parse(this.commonService.loginData);
		
        this.commonService.getData().subscribe((res)=>{
        console.log(res);
        this.settingData=res.data;


        });

        route.params.forEach((params : Params) => {
            this.propertyId = params["id"];
            this.propertyVcode = params["id2"];
        });
        
        route.params.subscribe(val => this.getPropertyDetails())

       //this.getPropertyDetails();
       if(this.loginData){
         commonService.updateRedirectUrl('');
       }

       this.commonService.get('getAllLanguage').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getAllLanguage');
        this.AllLanguage=res.data;
    
    
      });

    } // close of constructor
    
    redirectTo(uri:string){
        this._router.navigate(['/property-listing-details/'+uri])
    }
    
    saveFavourite(){

        if(!this.loginData){
        let hashpath=this.commonService.getHashPath();
        let hashpathArr=hashpath.split('#/');
        this.commonService.updateRedirectUrl(hashpathArr[1]);
        this._router.navigate(['/sign-in']);
        
        }else{

          this.activeClass = "active";
          window.scrollTo(0, 0);
           this.commonService.post('saveFavourite',{property_id:this.propertyId,'user_id':this.loginData.id}).subscribe((res)=>{
            console.log(res._body,' after saveFavourite');
            let Jres=JSON.parse(res._body);
            //console.log(Jres,' after parse saveFavourite');
            if(Jres.Ack==0){
               this.activeClass = "";
               this.alertService.success('You have already added this property in your favouritelist.', true);
            }else{
                this.activeClass = "";
                
               this.alertService.success('You have added this property in your favouritelist.', true);
            }
            });  
          this.getPropertyDetails();
        }
       
    }

    getPropertyDetails(){

        if(this.propertyId){
          console.log(this.propertyId,'edit property id');
          let sendData:any;
          if(this.loginData){
            sendData={prop_id:this.propertyId,prop_vcode:this.propertyVcode,'loginId':this.loginData.id};
  
          }else{
            sendData={prop_id:this.propertyId,prop_vcode:this.propertyVcode,'loginId':''};
          }
          

         

            this.commonService.post('getPropertyDetails',sendData).subscribe((res)=>{
                let Jres=JSON.parse(res._body);
                this.propertyDetails=Jres.data;
                console.log(this.propertyDetails.other_character,"other chracter");
                this.other_character=JSON.parse(Jres.data.other_character); // parsing characteristics json
                this.character_other=JSON.parse(Jres.data.chracter_other); // parsing characteristics json
                this.sameProperty=Jres.sameProperty;
                this.galleryImages=Jres.data.images;

                //console.log(this.propertyDetails,' after parse getPropertyDetails');
                //console.log(this.sameProperty,' after parse this.sameProperty');

                this.repoUrl=this.commonService.realRath;
                //console.log(this.repoUrl,' after parse this.repoUrl');
                
                this.repoUrl=this.commonService.getRealPath();
                //console.log(this.repoUrl,' after parse this.repoUrl');
                
                this.imageUrl=this.commonService.getImgSrc(Jres.data.images[0]);

                if(this.propertyDetails.meta_title){
                  this.commonService.updateTitle(this.propertyDetails.meta_title);
                  this.commonService.updateDescription(this.propertyDetails.meta_description);
                }else{
                  this.commonService.updateTitle(this.propertyDetails.prop_title);
                  this.commonService.updateDescription(this.propertyDetails.prop_desc_en);
                }
                
                let video_urls=JSON.parse(Jres.data.video_urls);
                this.urls = [];
                
                if(video_urls) {
                    for(let i=0;i<video_urls.length;i++){
                      let id=video_urls[i].split('?v=');
                      //console.log(id,'id');
                      this.urls.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id[1]));
                    } 
                } else {
                    this.urls = [];
                }
                
                //console.log(video_urls,'video_urls');
                //console.log(this.urls,'this.urls');

       
                let imgUrl=this.settingData.site_url+'files/'+Jres.data.all_images[0].hash+'/'+Jres.data.all_images[0].name;


                this.metaService.setTitle(this.propertyDetails.prop_title);
                this.metaService.setTag('og:image',imgUrl);

                this.is_fav=Jres.is_fav;

            });
        }
    }    



    fbButton = new ShareButton(
        ShareProvider.FACEBOOK,
        '<i class="fa fa-facebook"></i>',
        'btn btn-default facebook'
   );

   lnButton = new ShareButton(
        ShareProvider.LINKEDIN,
        '<i class="fa fa-linkedin"></i>',
        'btn btn-default linkedIn'
   );

   gButton = new ShareButton(
    ShareProvider.GOOGLEPLUS,
    '<i class="fa fa-google-plus"></i>',
    'btn btn-default google-plus'
   );


   tButton = new ShareButton(
    ShareProvider.TWITTER,
    '<i class="fa fa-twitter></i>',
    'btn btn-default twitter'
   );

  


    ngOnInit(): void {
 
        this.galleryOptions = [
            {
                width: '100%',
                height: '368px',
                thumbnailsColumns: 5,
				"thumbnails": false,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 1199
            {
                breakpoint: 1199,
                width: '100%',
                height: '368px',
                imagePercent: 80,
				"thumbnails": false,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 991
            {
                breakpoint: 991,
                width: '100%',
                height: '368px',
                thumbnailsColumns: 4,
                imagePercent: 80,
				"thumbnails": false,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: true,
		"thumbnails": false,
                thumbnailsColumns: 3
            }
        ];
 
        /*
        this.galleryImages = [
            {
                small: 'assets/images/1.jpg',
                medium: 'assets/images/1.jpg',
                big: 'assets/images/1.jpg'
            },
            {
                small: 'assets/images/2.jpg',
                medium: 'assets/images/2.jpg',
                big: 'assets/images/2.jpg'
            },
            {
                small: 'assets/images/3.jpg',
                medium: 'assets/images/3.jpg',
                big: 'assets/images/3.jpg'
            },
            {
                small: 'assets/images/4.jpg',
                medium: 'assets/images/4.jpg',
                big: 'assets/images/4.jpg'
            },
            {
                small: 'assets/images/5.jpg',
                medium: 'assets/images/5.jpg',
                big: 'assets/images/5.jpg'
            },
            {
                small: 'assets/images/6.jpg',
                medium: 'assets/images/6.jpg',
                big: 'assets/images/6.jpg'
            },
            {
                small: 'assets/images/7.jpg',
                medium: 'assets/images/7.jpg',
                big: 'assets/images/7.jpg'
            },
            {
                small: 'assets/images/8.jpg',
                medium: 'assets/images/8.jpg',
                big: 'assets/images/8.jpg'
            }
        ]; */

    }
	/*properties = [
		{
		'images':'assets/images/pro1.jpg',
		'price':'225,000',
		'title':'South Celler Court',
		'address':'2492 Islington Ave, Toronto, Ontario M9V 2X5',
		'area':'125 sqft',
		'bedroom':'4',
		'bathroom':'2'
		},
		{
		'images':'assets/images/pro1.jpg',
		'price':'225,000',
		'title':'South Celler Court',
		'address':'2492 Islington Ave, Toronto, Ontario M9V 2X5',
		'area':'125 sqft',
		'bedroom':'4',
		'bathroom':'2'
		},
		{
		'images':'assets/images/pro1.jpg',
		'price':'225,000',
		'title':'South Celler Court',
		'address':'2492 Islington Ave, Toronto, Ontario M9V 2X5',
		'area':'125 sqft',
		'bedroom':'4',
		'bathroom':'2'
		},
		{
		'images':'assets/images/pro1.jpg',
		'price':'225,000',
		'title':'South Celler Court',
		'address':'2492 Islington Ave, Toronto, Ontario M9V 2X5',
		'area':'125 sqft',
		'bedroom':'4',
		'bathroom':'2'
		},
		{
		'images':'assets/images/pro1.jpg',
		'price':'225,000',
		'title':'South Celler Court',
		'address':'2492 Islington Ave, Toronto, Ontario M9V 2X5',
		'area':'125 sqft',
		'bedroom':'4',
		'bathroom':'2'
		},
		{
		'images':'assets/images/pro1.jpg',
		'price':'225,000',
		'title':'South Celler Court',
		'address':'2492 Islington Ave, Toronto, Ontario M9V 2X5',
		'area':'125 sqft',
		'bedroom':'4',
		'bathroom':'2'
		}
	]; */
	myRecaptcha = new FormControl(false);
    onScriptLoad() {
        console.log('Google reCAPTCHA loaded and is ready for use!')
    }
    onScriptError() {
        console.log('Something went long when loading the Google reCAPTCHA')
    }
	model = new Contact('', '', '', '');
    submitted = false;
    onSubmit() { this.submitted = true; }
    get diagnostic() { return JSON.stringify(this.model); }

    activeClass='';
    emailSubmit(f){
      f.value.type='Via Phone Request';
      f.value.property_id=this.propertyDetails.id;
      this.activeClass = "active";
      window.scrollTo(0, 0);
      console.log(f.value,'form attribute');
       this.commonService.post('leadSubmit',f.value).subscribe((res)=>{
        console.log(res._body,' after leadSubmit');
        let Jres=JSON.parse(res._body);
        //console.log(Jres,' after parse leadSubmit');
        if(Jres.Ack==2){
            this.activeClass = "";
            this.is_valid=1;
        }
        else if(Jres.Ack==0){
           this.activeClass = "";
           this.is_valid=0;
        }else{
            this.activeClass = "";
           this.is_show_phone=1;
           this.is_show_email_form=0;
           this.is_valid=0;
        }
        });  

    }


    contactSubmit(f){
      f.value.type='Via Contact Form';
      f.value.property_id=this.propertyDetails.id;
      this.activeClass = "active";
      window.scrollTo(0, 0);
      console.log(f.value,'Contact form attribute');
       this.commonService.post('leadSubmit',f.value).subscribe((res)=>{
        console.log(res._body,' after contactSubmit');
        let Jres=JSON.parse(res._body);
        //console.log(Jres,' after parse contactSubmit');
        if(Jres.Ack==0){
           this.activeClass = "";
        }else{
            this.activeClass = "";
            f.resetForm();
           this.alertService.success('You contacted successfully.', true);
        }
        });  

    }


  openModal(template: TemplateRef<any>) {
    if(!this.loginData){
        let hashpath=this.commonService.getHashPath();
        let hashpathArr=hashpath.split('#/');
        this.commonService.updateRedirectUrl(hashpathArr[1]);
       this._router.navigate(['/sign-in']);

     }else{
        
        this.modalRef = this.modalService.show(template);
     }
    
  }
  
  

  reportSubmit(f){
    
      this.modalRef.hide();
     
     f.value.user_id=this.loginData.id;
     f.value.property_id=this.propertyDetails.id;
      this.activeClass = "active";
      window.scrollTo(0, 0);
      console.log(f.value,'Contact form attribute');
       this.commonService.post('reportSubmit',f.value).subscribe((res)=>{
        console.log(res._body,' after reportSubmit');
        let Jres=JSON.parse(res._body);
        //console.log(Jres,' after parse reportSubmit');
        if(Jres.Ack==0){
           this.activeClass = "";
        }else{
            this.activeClass = "";
            f.resetForm();
           this.alertService.success('Thank you for taking time to report the listing.', true);
        }
        });
   
  }



  

}


export declare class FacebookParams {
    u: string;
}

export class LinkedinParams {
    url:string
}


