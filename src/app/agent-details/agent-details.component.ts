import { Component, OnInit, TemplateRef } from '@angular/core';

import { Router, NavigationStart , ActivatedRoute, Params} from '@angular/router';
import { CommonServiceService } from '../services/common-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Rate }    from './rate';

import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent implements OnInit {
  model = new Rate('');
  submitted = false;
  onSubmit() { this.submitted = true; }
  
  max = 5;
  rate = 0;
  isReadonly = false;
 
  overStar: number;
  percent: number;
 
  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }
 
  resetStar(): void {
    this.overStar = void 0;
  }
  


  isReadonlyUser: boolean = true;
  ratings:any;
  
  public repoUrl = '';
  public imageUrl = '';
  
  

  userDetails:any;
  userProperties:any;
  settingData:any;
  userId:number;
  loginData:any;
  is_like_by_me:any;
  AllLanguage:any;
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  constructor(private modalService: BsModalService, private commonService: CommonServiceService,private route : ActivatedRoute,private _router: Router, private alertService: AlertService) { 
       this.loginData=JSON.parse(this.commonService.loginData);
       this.commonService.getData().subscribe((res)=>{
        console.log(res);
        this.settingData=res.data;


        });

        route.params.forEach(
           (params : Params) => {
               this.userId = params["id"];
           }
        );
        this.getUserDetails();

        this.commonService.get('getAllLanguage').subscribe((res)=>{
            //console.log(res);
            console.log(res,'getAllLanguage');
            this.AllLanguage=res.data;
        
        
          });


          this.getUserReviews(this.userId);
          

  }

  getUserReviews(userId){
    this.commonService.post('getReviews',{userId:userId}).subscribe((res)=>{
      //console.log(res);
      let Jres=JSON.parse(res._body);
      this.ratings=Jres.data;
      console.log(this.ratings,' after parse getReviews');
  
  
    });

  }


  
  getUserDetails(){
     if(this.userId){
      console.log(this.userId,'edit userId');
       if(!this.loginData){

          this.commonService.post('getUserDetails',{userId:this.userId,'loginId':''}).subscribe((res)=>{
          let Jres=JSON.parse(res._body);
          this.userDetails=Jres.data;
          this.userProperties=Jres.properties;
          console.log(this.userDetails,' after parse userDetails');
          console.log(this.userProperties,' after parse userProperties');
          this.repoUrl=this.commonService.service_url+'getUserShareData/'+this.userDetails.user_name;
          this.imageUrl=this.commonService.getImgSrc(Jres.data);
          this.commonService.changedTitle(Jres.data.user_name);

          this.is_like_by_me=Jres.is_like;
         });
       }else{
          this.commonService.post('getUserDetails',{userId:this.userId,'loginId':this.loginData.id}).subscribe((res)=>{
          let Jres=JSON.parse(res._body);
          this.userDetails=Jres.data;
          this.userProperties=Jres.properties;
          console.log(this.userDetails,' after parse userDetails');
          console.log(this.userProperties,' after parse userProperties');
          this.repoUrl=this.commonService.service_url+'getUserShareData/'+this.userDetails.user_name;
          this.imageUrl=this.commonService.getImgSrc(Jres.data);
          this.commonService.changedTitle(Jres.data.user_name);

          this.is_like_by_me=Jres.is_like;
      });
       }
      

    }
  }
  

  ngOnInit() {
  }

  like(){

    if(!this.loginData){
        this._router.navigate(['/sign-in']);
        //location.reload();
    }else{
      this.commonService.post('like',{userId:this.userId,'loginId':this.loginData.id}).subscribe((res)=>{
          this.getUserDetails();
      });
    }
      
  }

  unlike(){

    if(!this.loginData){
        this._router.navigate(['/sign-in']);
        //location.reload();
    }else{
      this.commonService.post('unlike',{userId:this.userId,'loginId':this.loginData.id}).subscribe((res)=>{
          this.getUserDetails();
      });
    }

  }
  activeClass='';

  postReview(f){

  
    this.activeClass = "active";
    window.scrollTo(0, 0);
    console.log(f.value,'postReview attribute');
     this.commonService.post('postReview',f.value).subscribe((res)=>{
  this.modalRef.hide()
      console.log(res._body,' after postReview');
      let Jres=JSON.parse(res._body);
      //console.log(Jres,' after parse contactSubmit');
      if(Jres.Ack==0){
         this.activeClass = "";
      }else{
          this.activeClass = "";
          f.resetForm();
         this.alertService.success('You reviewed successfully.', true);
         this.getUserReviews(this.userId);
      }
      });  

  }


}


export declare class FacebookParams {
    u: string;
}

export class LinkedinParams {
    url:string;
}
