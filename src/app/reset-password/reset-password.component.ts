import { Component, OnInit } from '@angular/core';

import { CommonServiceService } from '../services/common-service.service';
 
import { AlertService } from '../services/alert.service';

import { Router, NavigationStart , ActivatedRoute, Params, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    
  /* For AOT Build*/  
  public submitted:string;
  public pwdModel:string;
  public cpwdModel:string;
  
  profileId:number;
  profileVcode:number;
  activeClass = "active";
  err_msg='';
  constructor(private commonService: CommonServiceService,private route : ActivatedRoute,private _router: Router, private alertService: AlertService) {
		
        

    route.params.forEach(
       (params : Params) => {
           this.profileId = params["id"];
           this.profileVcode = params["id2"];
       }
    );
    if(this.profileId){
      console.log(this.profileId,'resetPassword id');
      this.commonService.post('resetPassword',{pro_id:this.profileId,pro_vcode:this.profileVcode}).subscribe((res)=>{
          this.activeClass = "";
          let Jres=JSON.parse(res._body);
          console.log(Jres,'resetPassword data');

         if(Jres.approve==0){
          this.alertService.success('Invalid url.', true);
          this._router.navigate(['/sign-in']);
          }else if(Jres.approve==1){
            
          }
    
      });


     

    }


}

onSubmit(f){
  this.activeClass = "active";
  if(f.value.pwd!=f.value.cpwd){
    this.err_msg='Password and confirm password does not match.';
    this.activeClass = " ";
  }else{
    this.err_msg='';
      this.commonService.post('resetPasswordPost',{pro_id:this.profileId,pro_vcode:this.profileVcode,password:f.value.pwd}).subscribe((res)=>{
        this.activeClass = "";
        let Jres=JSON.parse(res._body);
        console.log(Jres,'resetPasswordPost data');

      if(Jres.approve==0){
        this.alertService.success('Invalid url.', true);
        this._router.navigate(['/sign-in']);
        }else if(Jres.approve==1){
          this.alertService.success('Pssword updated succesfully. Login with your new password.', true);
          this._router.navigate(['/sign-in']);
        }

    });
  }
}

  ngOnInit() {
  }

}
