import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { ToastService } from '../services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import { CommonServiceService } from '../services/common-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.css']
})
export class SettingComponentComponent implements OnInit {
  model2={id: '',password2:'',confirmPassword:''};
  activeClass='';

  AllLanguage:any;

  constructor(private commonService: CommonServiceService,private router: Router,private alertService: AlertService,public toastService:ToastService,private translate: TranslateService) {

        this.commonService.get('getAllLanguage').subscribe((res)=>{
          //console.log(res);
          console.log(res,'getAllLanguage');
          this.AllLanguage=res.data;
        });
   }

  ngOnInit() {
  }
loginData: any;

    onSubmit2() {
    //this.submitted2 = true; 
    console.log(this.model2,'updatePassword from post data');
    this.activeClass = "active";
    let loc=localStorage.getItem('loginData')
    this.loginData=JSON.parse(loc);
    console.log(this.loginData,'loginData from post updatePassword data');
    this.activeClass = "active";
    this.model2.id=this.loginData.id;
    console.log(this.loginData.id,'model2 from post updatePassword data');
    this.commonService.post('updatePassword',this.model2).subscribe((res)=>{
         
        //console.log(res._body,' after updatePassword');
        let Jres=JSON.parse(res._body);
        console.log(Jres,' after parse updatePassword');
        if(Jres.Ack==0){
           this.activeClass = "";
           this.toastService.openSnackBar("Success", this.translate.instant('PASSWORD_UPDATE_UNSUCCESSFULL', this.AllLanguage));
        }else{
            this.activeClass = "";
          
           localStorage.setItem('userData', JSON.stringify(Jres.data));
           //this.alertService.success('Password update successfull', true);
           this.toastService.openSnackBar("Success", this.translate.instant('PASSWORD_UPDATE_SUCCESSFULL', this.AllLanguage));
           this.router.navigateByUrl('profile');
        }
    
    });
   
  }

}
