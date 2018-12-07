import { Component, OnInit , Input, TemplateRef , ViewChild, ElementRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CommonServiceService } from '../services/common-service.service';

//lang
import { TranslateService } from '@ngx-translate/core';
//lang

import { AlertService } from '../services/alert.service';



@Component({
  selector: 'app-my-subscription',
  templateUrl: './my-subscription.component.html',
  styleUrls: ['./my-subscription.component.css']
})
export class MySubscriptionComponent implements OnInit {
  
  subscriptions:any;
  settingsData:any;
  loginData:any;
  @Input('master') AllLanguage: any;
  constructor(private commonService: CommonServiceService,private alertService: AlertService,private modalService: BsModalService, private translate: TranslateService) { 
    this.loginData=JSON.parse(this.commonService.loginData);

    this.commonService.getData().subscribe((res)=>{
        
        this.settingsData=res.data;

    });
   
   this.userSubscriptions();
 
  }

  ngOnInit() {
  }


  userSubscriptions(){
    this.commonService.post('getUserSubscriptions',{user_id:this.loginData.id}).subscribe((res)=>{
      let Jres=JSON.parse(res._body);
      console.log(Jres,' after parse getUserSubscriptions');
      this.subscriptions=Jres.data;
      console.log(this.subscriptions,' after parse getUserSubscriptions');
  });
}
activeClass='';
unsubscribe(sub_id){
  this.activeClass="active";
  this.commonService.post('unSubscription',{sub_id:sub_id}).subscribe((res)=>{
  window.scrollTo(0, 0)

  this.alertService.success('You have unsubscribed successfully.', true);
  this.activeClass = "";
  this.userSubscriptions();
});
}

}
