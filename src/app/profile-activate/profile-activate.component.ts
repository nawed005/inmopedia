import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { FormControl } from '@angular/forms';

import { Router, NavigationStart , ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import { CommonServiceService } from '../services/common-service.service';



import { AlertService } from '../services/alert.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-activate',
  templateUrl: './profile-activate.component.html',
  styleUrls: ['./profile-activate.component.css']
})
export class ProfileActivateComponent implements OnInit {

  profileId:number;
  profileVcode:number;


  constructor(private sanitizer: DomSanitizer, private commonService: CommonServiceService,private route : ActivatedRoute,private _router: Router, private alertService: AlertService) {
		
        

    route.params.forEach(
       (params : Params) => {
           this.profileId = params["id"];
           this.profileVcode = params["id2"];
       }
    );
    if(this.profileId){
      console.log(this.profileId,'edit profile id');
      this.commonService.post('profileApprove',{pro_id:this.profileId,pro_vcode:this.profileVcode}).subscribe((res)=>{
          let Jres=JSON.parse(res._body);
          console.log(Jres,'Profile aprove data');

         if(Jres.approve==0){
          this.alertService.success('Invalid url.', true);
          this._router.navigate(['/sign-in']);
          }else if(Jres.approve==1){
            this.alertService.success('Profile approved successfully', true);
            this._router.navigate(['/sign-in']);
          }else if(Jres.approve==2){
            this.alertService.success('Profile can not be approved.', true);
            this._router.navigate(['/sign-in']);
          }
    
      });


     

    }


}


  ngOnInit() {
  }

}
