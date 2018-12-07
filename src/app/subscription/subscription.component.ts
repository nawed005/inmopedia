import { Component, OnInit , TemplateRef} from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';
import { Router } from '@angular/router';
//lang
import { TranslateService } from '@ngx-translate/core';
//lang
 
import { AlertService } from '../services/alert.service';
import { ToastService } from '../services/toast.service';

import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
 


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptions = [];
  subscriptions_text: string;
  free_text = "TRY IT FOR FREE";
  AllLanguage:any;
  constructor(private commonService: CommonServiceService ,private router: Router, private alertService: AlertService, private translate: TranslateService,private modalService: BsModalService, public toastService:ToastService) { }
  activeClass='';

  public payPalConfig?: PayPalConfig;
  paymentType:string='Stripe';

  modalRef: BsModalRef;

  ngOnInit() {

     this.commonService.getLangData({'item':'SUBCRIPTION_PLANS_TEXT'}).subscribe((res)=>{
        console.log(res,' lang data baaner small text');
        this.subscriptions_text=res.data;
    });

     this.commonService.getSubscriptionPlans().subscribe((res)=>{
        console.log(res,'subscription plans');
        this.subscriptions=res.data;
        
    });

    this.commonService.get('getAllLanguage').subscribe((res)=>{
      //console.log(res);
      console.log(res,'getAllLanguage');
      this.AllLanguage=res.data;
  
  
    });
    let userData;
    if(this.commonService.userLoggedIn){
      userData=localStorage.getItem('loginData');
      let userDataObj=JSON.parse(userData);
      this.checkUserAlreadySubscribed(userDataObj.id);
      
     }else{
      userData=localStorage.getItem('userData');
      if(userData==null){
        this.router.navigateByUrl('sign-in');
      }else{
        let userDataObj=JSON.parse(userData);
        this.checkUserAlreadySubscribed(userDataObj.id);
         
      }
    
      }

      this.initConfig(1,'',1,'','');
}

  packgSubscribe(){
     
     let userData;
     if(this.commonService.userLoggedIn){
      userData=localStorage.getItem('loginData');
      let userDataObj=JSON.parse(userData);
    
      this.openCheckout(this.sub_pack,this.sub_text,this.sub_amnt,userDataObj,this.commonService.userLoggedIn);
     }else{
      userData=localStorage.getItem('userData');
      if(userData==null){
        this.router.navigateByUrl('sign-in');
      }else{
        let userDataObj=JSON.parse(userData);
        this.openCheckout(this.sub_pack,this.sub_text,this.sub_amnt,userDataObj,this.commonService.userLoggedIn);
         
      }
     }
     
     
     
     
  }
  
  public isUserSubscribe='';
  public isfree=0;
  
  checkUserAlreadySubscribed(userId){
    this.commonService.post('checkUserAlreadySubscribed',{user_id:userId}).subscribe((res)=>{
        console.log(res,'checkUserAlreadySubscribed');
        let Jres=JSON.parse(res._body);
        if(Jres.Ack==0){
          this.isUserSubscribe='disble';
          this.isfree=Jres.isfree;
        }else{
          this.isUserSubscribe='';
          this.isfree=Jres.isfree;
        }

    });
  }

 

   openCheckout(pckgId,text,amnt,userDataObj,isLoggedIn) {

    if(pckgId==1){
  this.activeClass='active';

      let data={pckg_id:pckgId,user_id:userDataObj.id,token:0,isLoggedIn:isLoggedIn,payment_method:'Free'};
        this.commonService.post('subscribe',data).subscribe((res)=>{
            //console.log(res._body,' after signup');
          this.activeClass='';

            let Jres=JSON.parse(res._body);
            console.log(Jres,' after parse subscribe');
            if(Jres.Ack==0){
              //this.is_email_exist=1;
            }else{
               //this.is_email_exist=0;
               //localStorage.setItem('userData', JSON.stringify(Jres.data));
               if(isLoggedIn){
                
                if(localStorage.tempData) { 
                    //this.modalClose('You subscribe to a plan successfully.');
                    this.toastService.openSnackBar("Success", "Email confirmation sent, please confirm email in order to publish property!");
                    this.commonService.post('updateTempProperties',{"user_id":data.user_id,"tmp_id":localStorage.getItem('tempData')}).subscribe((res2)=>{ 
                        let temp_res=JSON.parse(res2._body);
                        console.log(temp_res,' Temp Api response');
                        if(temp_res.Ack==1){
                            console.log(temp_res.data);
                            localStorage.removeItem('tempData');
                            //this.router.navigate(['/edit-property',temp_res.data.prop_slug]);
                            
                            this.toastService.openSnackBar("Success", "Property Added successfully!");
                            this.router.navigateByUrl('profile');
                              
                        } else { // temporary property checking else
                            this.toastService.openSnackBar("Error", "No Property found!");
                            this.router.navigateByUrl('profile');
                        }
                    });
                } else {
                    this.modalClose('You subscribe to a plan successfully.');
                    this.router.navigateByUrl('profile');
                }
                
                
               }else{
                //this.modalClose('Your registration with inmopedia is successfull. Kindly sign in and post your first property. Thanks');
                this.modalClose('Your registration with inmopedia is successfull.Email sent to your register email id , please check your mail.');
                this.router.navigateByUrl('sign-in');
               }
               
            }
            //console.log(Jres.Ack,' ack');
            //this.banner_small_text=res.data;
        });
    } else{
    
          var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_8ngTuEkxlE3fZkJMJgqm1Cwx',
            locale: 'auto',
            token: token => {
              console.log(token,'token');
              let data={pckg_id:pckgId,user_id:userDataObj.id,token:token.id,isLoggedIn:isLoggedIn,email:token.email,payment_method:'Stripe'};
              this.commonService.post('subscribe',data).subscribe((res)=>{
                  //console.log(res._body,' after signup');
                  let Jres=JSON.parse(res._body);
                  console.log(Jres,' after parse subscribe');
                  if(Jres.Ack==0){
                    //this.is_email_exist=1;
                  }else{
                    //this.is_email_exist=0;
                    //localStorage.setItem('userData', JSON.stringify(Jres.data));
                    if(isLoggedIn){
                      
                        if(localStorage.tempData) { 
                            this.toastService.openSnackBar("Success", "Email confirmation sent, please confirm email in order to publish property!");
                            this.commonService.post('updateTempProperties',{"user_id":data.user_id,"tmp_id":localStorage.getItem('tempData')}).subscribe((res2)=>{ 
                                let temp_res=JSON.parse(res2._body);
                                console.log(temp_res,' Temp Api response');
                                if(temp_res.Ack==1){
                                    console.log(temp_res.data);
                                    localStorage.removeItem('tempData');
                                    //this.router.navigate(['/edit-property',temp_res.data.prop_slug]);    
                                    
                                    this.toastService.openSnackBar("Success", "Property Added successfully!");
                                    this.router.navigateByUrl('profile');
                                    
                                } else { // temporary property checking else
                                    this.toastService.openSnackBar("Error", "No Property found!");
                                    this.router.navigateByUrl('profile');
                                }
                            });
                        } else {
                            this.modalClose('You subscribe to a plan successfully.');
                            this.router.navigateByUrl('profile');
                        }
                        
                    }else{
                      //this.modalClose('Your registration with inmopedia is successfull. Kindly sign in and post your first property. Thanks');
                      this.modalClose('Your registration with inmopedia is successfull.Email sent to your register email id , please check your mail.');
                      this.router.navigateByUrl('sign-in');
                    }
                    
                  }
                  //console.log(Jres.Ack,' ack');
                  //this.banner_small_text=res.data;
              });
            }
          });

          handler.open({
            name: this.translate.instant('siteTitle',this.commonService.settingsData),
            description:  this.translate.instant('subscriptionsText',text),
            amount: amnt*100
          });

        }
  }




  private initConfig(pckgId,text,amnt,userDataObj,isLoggedIn): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AUTsl0cEnpxP0Q_h1DOBFvYpn-RJIALSleB5DZ0hep7Hskx_DPuCiVlJJp7pm3FbDlFCdGsSiynFBXwA'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log(data,'data');
        console.log(actions,'actions');
        console.log('OnPaymentComplete');
        //let data1={prop_id:propId,user_id:userDataObj.id,featured:featured,token:data.paymentID,method:"PayPal"};
        let data1={pckg_id:pckgId,user_id:userDataObj.id,token:data.paymentID,isLoggedIn:isLoggedIn,email:'',payment_method:'PayPal'};
        this.commonService.post('subscribe',data1).subscribe((res)=>{
          //console.log(res._body,' after signup');
          let Jres=JSON.parse(res._body);
          console.log(Jres,' after parse subscribe');
            if(Jres.Ack==0){
              //this.is_email_exist=1;
            }else{
              //this.modalClose('Your registration with inmopedia is successfull. Kindly sign in and post your first property. Thanks');
              this.modalClose('Your registration with inmopedia is successfull.Email sent to your register email id , please check your mail.');
              this.router.navigateByUrl('sign-in');
               
            }
            //console.log(Jres.Ack,' ack');
            //this.banner_small_text=res.data;
        });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
        this.modalClose('Your payment is not done.');
      },
      onError: (err) => {
        console.log('OnError',err);
        this.modalClose('Your payment is not done.');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: amnt
        }
      }]
    });
  }
  sub_pack='';
  sub_text='';
  sub_amnt:number=0;

  openModal(template: TemplateRef<any>,pckgId,text,amnt:number) {
    
    
    this.sub_pack=pckgId;
    this.sub_text=text;
    this.sub_amnt=amnt;
    if(pckgId==1){
      this.packgSubscribe();

    }else{

    
    this.modalRef = this.modalService.show(template);
    let userData;
    if(this.commonService.userLoggedIn){
     userData=localStorage.getItem('loginData');
     let userDataObj=JSON.parse(userData);
   
     this.initConfig(pckgId,text,amnt,userDataObj,this.commonService.userLoggedIn);
    }else{
     userData=localStorage.getItem('userData');
     if(userData==null){
       this.router.navigateByUrl('sign-in');
     }else{
       let userDataObj=JSON.parse(userData);
       this.initConfig(pckgId,text,amnt,userDataObj,this.commonService.userLoggedIn);
        
     }
    }
  }
    
  }

  modalClose(msg){
    if( this.modalRef ) {  
      this.modalRef.hide(); 
    }
    window.scrollTo(0, 0);
    this.alertService.success(msg, true);
  }

 
}
