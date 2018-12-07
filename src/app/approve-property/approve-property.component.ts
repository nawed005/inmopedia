import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { FormControl } from '@angular/forms';

import { Router, NavigationStart , ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import { CommonServiceService } from '../services/common-service.service';



import { AlertService } from '../services/alert.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-approve-property',
  templateUrl: './approve-property.component.html',
  styleUrls: ['./approve-property.component.css']
})
export class ApprovePropertyComponent implements OnInit {


   propertyId:number;
   propertyVcode:number;


  constructor(private sanitizer: DomSanitizer, private commonService: CommonServiceService,private route : ActivatedRoute,private _router: Router, private alertService: AlertService) {
		
        

        route.params.forEach(
           (params : Params) => {
               this.propertyId = params["id"];
               this.propertyVcode = params["id2"];
           }
        );
        if(this.propertyId){
          console.log(this.propertyId,'edit property id');
          this.commonService.post('propertApprove',{prop_id:this.propertyId,prop_vcode:this.propertyVcode}).subscribe((res)=>{
              let Jres=JSON.parse(res._body);
              console.log(Jres,'property aprove data');

		         if(Jres.approve==0){

		          }else if(Jres.approve==1){
		            this.alertService.success('Property approved successfully', true);
		            this._router.navigateByUrl('property-listing-details/'+this.propertyId);
		          }else if(Jres.approve==2){
		            this.alertService.success('Property can not be approved.', true);
		            this._router.navigateByUrl('property-listing-details/'+this.propertyId);
		          }
			  
          });


         

        }


    }

  ngOnInit() {
  }

}
