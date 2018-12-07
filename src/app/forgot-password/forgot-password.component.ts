import { Component, OnInit } from '@angular/core';
import { ForgotPassword } from './forgot_password';

import { CommonServiceService } from '../services/common-service.service';
 
import { AlertService } from '../services/alert.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  model = new ForgotPassword('');
  submitted = false;
  activeClass:string;
  is_email_not_exist=0;
  err_msg='';
  AllLanguage:any;
  onSubmit(forgotForm) { 
    //this.submitted = true; 
    console.log(this.model,' this.model forgetPassword');
    console.log(forgotForm.value);
    this.activeClass = "active";
    this.commonService.post('forgetPassword',this.model).subscribe((res)=>{
        //console.log(res._body,' after forgetPassword');
        let Jres=JSON.parse(res._body);
        console.log(Jres,' after parse forgetPassword');
        this.activeClass = "";
        if(Jres.Ack==0){
          this.is_email_not_exist=1;
          this.err_msg='Email is not exist.';
        }else if(Jres.Ack==2){
          this.is_email_not_exist=1;
          this.err_msg='Your email is not verified yet.';
        }else{
          forgotForm.resetForm();
          this.alertService.success('Check your email to set your password.', true);
        }
        //console.log(Jres.Ack,' ack');
        //this.banner_small_text=res.data;
    });

  }
  get diagnostic() { return JSON.stringify(this.model); }
  constructor(private commonService: CommonServiceService,private router: Router, private alertService: AlertService) { 

    this.commonService.get('getAllLanguage').subscribe((res)=>{
      //console.log(res);
      console.log(res,'getAllLanguage');
      this.AllLanguage=res.data;
  
  
    });
  }

  ngOnInit() {
  }

}
