import { Component, OnInit , Input, TemplateRef } from '@angular/core';

import { CommonServiceService } from '../services/common-service.service';

import { AlertService } from '../services/alert.service';

import { Router, NavigationStart , ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-favourite-properties',
  templateUrl: './favourite-properties.component.html',
  styleUrls: ['./favourite-properties.component.css']
})
export class FavouritePropertiesComponent implements OnInit {

  property_lists:any[];
  settingsData:any;
  loginData:any;
  activeClass:any;

  constructor(private commonService: CommonServiceService,private alertService: AlertService,private router: Router) { 
     this.loginData=JSON.parse(this.commonService.loginData);

    this.commonService.getData().subscribe((res)=>{
        
        this.settingsData=res.data;

    });
   
   this.userFavouriteProperties();
  }

  ngOnInit() {
  }


  userFavouriteProperties(){
      this.commonService.post('getUserFavouriteProperties',{user_id:this.loginData.id}).subscribe((res)=>{
        let Jres=JSON.parse(res._body);
        console.log(Jres,' after parse getUserFavouriteProperties');
        this.property_lists=Jres.data;
        console.log(this.property_lists,' after parse getUserFavouriteProperties');
    });
  }


  removeProduct(productId:string,producName:string){
    
    if(confirm("Are you sure to delete this product "+producName+" from favorite list")) {
      this.activeClass = "active";
      console.log(productId,'productId');
      this.commonService.post('deleteFavoriteProperty',{pro_id:productId}).subscribe((res)=>{
           this.activeClass = "";
           console.log(res,' after deleteFavoriteProperty');
           this.userFavouriteProperties();
           window.scrollTo(0, 0);
           this.alertService.success('Property removed from the list successfuly', true);
    });
    }
  }

}
