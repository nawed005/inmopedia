import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { CommonServiceService } from '../services/common-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  service_areas = [
	"Brighton Beach, NY",
	"Financial District, NY",
	"New York, NY",
	"Tribeca, NY",
	"Upper East Side, NY",
	"Upper West Side, NY"
  ]
  specialties = [
	"Staging",
	"Buyer's Agent",
	"Listing Agent",
	"Relocation"
  ]
  loginData: any;
  profile='';
  settingsData:any;
  AllLanguage:any;
  constructor(private commonService: CommonServiceService,private router: Router,private alertService: AlertService) {
    this.loginData=JSON.parse(this.commonService.loginData);
    this.profile=this.loginData;
    this.settingsData=commonService.getSettingsData();
    //console.log(this.settingsData,'this.settingsData from profile compo');
     this.commonService.getData().subscribe((res)=>{
        console.log(res,'home compo');
        this.settingsData=res.data;

       });

       this.commonService.updateTitle(this.loginData.name);
        this.commonService.updateDescription(this.loginData.about_me_en);
        


        if(this.commonService.redirectUrl){
          this.router.navigate([this.commonService.redirectUrl]);
          
         }

         this.commonService.get('getAllLanguage').subscribe((res)=>{
          //console.log(res);
          console.log(res,'getAllLanguage');
          this.AllLanguage=res.data;
      
      
        });
   }

  ngOnInit() {
  }

 activeClass='';
   logOut(){
  
    localStorage.removeItem('loginData');
    if(localStorage.tempData) { localStorage.removeItem('tempData'); }
    this.loginData='';
    this.commonService.changeLoginStatus(false);
    this.alertService.success('Logout successfully. Please visit our site again.', true);
    this.router.navigate(['/sign-in']);
  }

  edit=0;
  editProfile(){
    this.edit=1;
  }

  cancelUpdate(){
    this.edit=0;
  }

  updateProfile(){
   this.activeClass='active';
    let _formData: FormData = new FormData();
    _formData.append('id', this.loginData.id);
    //_formData.append('name', this.loginData.name);
    _formData.append('first_name', this.loginData.first_name);
    _formData.append('last_name', this.loginData.last_name);
    _formData.append('MyFile', this.editPic);
    _formData.append('about_me_en', this.loginData.about_me_en);
    _formData.append('address', this.loginData.address);
    _formData.append('website', this.loginData.website);
    _formData.append('mobile_number', this.loginData.mobile_number);
    _formData.append('service_areas_en', this.loginData.service_areas_en);
    _formData.append('specialities_en', this.loginData.specialities_en);
    _formData.append('fb_url', this.loginData.fb_url);
    _formData.append('ln_url', this.loginData.ln_url);
    _formData.append('company_name', this.loginData.company_name);
    
    console.log(_formData,'_formData');
    console.log(this.loginData,'after update'); 
    this.commonService.upload(_formData).subscribe((res)=>{
         this.activeClass='';
        console.log(res,' after updateProfile');
        //let Jres=JSON.parse(res._body);
        //console.log(Jres,' after parse updateProfile');
        if(res.Ack==0){
         
        }else{
           
           localStorage.setItem('loginData', JSON.stringify(res.data));
           this.loginData=JSON.parse(localStorage.getItem('loginData'));
           this.alertService.success('Profile update successful', true);
           this.edit=0;
           

        }
        //console.log(Jres.Ack,' ack');
        //this.banner_small_text=res.data;
    });
  }
  
  //image crop

imageChangedEvent: any = '';
croppedImage: any = '';
croppedFile: any = '';


imageLoaded() {
    // show cropper
}
loadImageFailed() {
    // show message
}

//image crop

urls:any;
editPic:any;
crper={x1: 10, y1: 10, x2: 10, y2: 10 };
fileChangeEvent(event: any){
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent,'this.imageChangedEvent');

     
}

imageCropped(image: any) {
    this.croppedImage = image;
    console.log(this.croppedImage,'this.croppedImage');
    
}

imageCroppedFile(image:any){
  this.croppedFile = image;
  console.log(this.croppedFile,'this.croppedFile');
  this.urls = [];

    let filess = image;
     console.log(filess,'files');
    this.editPic=image;
    if (filess) {
      for (let i=0; i<filess.length; i++){
      //for (let file of filess) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(filess[i]);
      }
    }
  }
}









interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}






