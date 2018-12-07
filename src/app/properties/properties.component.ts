import { Component, OnInit , Input, TemplateRef , ViewChild, ElementRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CommonServiceService } from '../services/common-service.service';

//lang
import { TranslateService } from '@ngx-translate/core';
//lang

import { AlertService } from '../services/alert.service';

import { Router, NavigationStart , ActivatedRoute, Params} from '@angular/router';

import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit{
  //featuredmodel = 'featuredByCity';
  property_lists:any[];
  @Input() childSettingsData:any;
  @ViewChild('myDiv') myDiv: ElementRef;
  settingsData:any;
  loginData:any;
  AllLanguage:any;
  method:"Stripe";
  prop_id=0;
  featured=0;
  amnt=0;
  public payPalConfig?: PayPalConfig;

  constructor(private commonService: CommonServiceService,private alertService: AlertService,private router: Router, private modalService: BsModalService, private translate: TranslateService) { 
    this.loginData=JSON.parse(this.commonService.loginData);

    this.commonService.getData().subscribe((res)=>{
        
        this.settingsData=res.data;

    });
   
   this.userProperties();
   this.commonService.get('getAllLanguage').subscribe((res)=>{
    //console.log(res);
    console.log(res,'getAllLanguage');
    this.AllLanguage=res.data;


  });
 
  }

  ngOnInit() {

    //this.payPalMethod(1,1,1);
    
    
  }

  priceChange(prop_id,featured,amnt){
     this.prop_id=prop_id;
     this.featured=featured;
     this.amnt=amnt;
     this.payPalMethod(this.prop_id,this.amnt,this.featured);
  }

  userProperties(){
      this.commonService.post('getUserProperties',{user_id:this.loginData.id}).subscribe((res)=>{
        let Jres=JSON.parse(res._body);
        console.log(Jres,' after parse getUserProperties');
        this.property_lists=Jres.data;
        console.log(this.property_lists,' after parse getUserProperties');
    });
  }

  removeProduct(productId:string,producName:string){

    if(confirm("Are you sure to delete this product: "+producName)) {
      console.log(productId,'productId');
      this.commonService.post('deleteProperty',{pro_id:productId}).subscribe((res)=>{
           console.log(res,' after deleteProperty');
           this.userProperties();
           this.alertService.success('Property deleted successfuly', true);
    });
    }
  }
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>,lead_id,lead_type) {
    this.modalRef = this.modalService.show(template);
    this.commonService.post('readLeads',{'lead_id':lead_id,'lead_type':lead_type}).subscribe((res)=>{
        console.log(res,' after readLeads');
        this.userProperties();
    });
  }
  leads = [
	  {
		"email":"demo@gmail.com",
		"name":"John Due",
		"phone":"9765235502",
		"date":"7/12/2018",
		"message":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	  },
	  {
		"email":"demo@gmail.com",
		"name":"John Due",
		"phone":"9765235502",
		"date":"7/12/2018",
		"message":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	  },
	  {
		"email":"demo@gmail.com",
		"name":"John Due",
		"phone":"9765235502",
		"date":"7/12/2018",
		"message":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	  },
	  {
		"email":"demo@gmail.com",
		"name":"John Due",
		"phone":"9765235502",
		"date":"7/12/2018",
		"message":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	  },
	  {
		"email":"demo@gmail.com",
		"name":"John Due",
		"phone":"9765235502",
		"date":"7/12/2018",
		"message":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	  }
  ]
  requestEmails = [
	{
		"email":"demo@gmail.com",
		"date":"7/12/2018"
	},
	{
		"email":"demo@gmail.com",
		"date":"7/12/2018"
	},
	{
		"email":"demo@gmail.com",
		"date":"7/12/2018"
	},
	{
		"email":"demo@gmail.com",
		"date":"7/12/2018"
	},
	{
		"email":"demo@gmail.com",
		"date":"7/12/2018"
	},
	{
		"email":"demo@gmail.com",
		"date":"7/12/2018"
	}
  ];

  
  multiFilter(array, filters) {
    return array.filter(o =>
        Object.keys(filters).every(k =>
            [].concat(filters[k]).some(v => o[k].includes(v))));
   }


   payFeature(f){
     console.log(f.value);
     
     
    
      this.stripeMethod(this.prop_id,this.amnt,this.featured);
    
     
        
     
     
  }

 



  stripeMethod(propId,amnt,featured) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: token => {
        console.log(token,'token');
        let userDataObj=this.loginData;
        let data={prop_id:propId,user_id:userDataObj.id,featured:featured,token:token.id,method:"Stripe"};
        this.commonService.post('doFeature',data).subscribe((res)=>{
            //console.log(res._body,' after signup');
            window.scrollTo(0, 0);
            this.modalRef.hide();
            let Jres=JSON.parse(res._body);
            console.log(Jres,' after parse do feature');
            if(Jres.Ack==0){
              //this.is_email_exist=1;
            }else{
               //this.is_email_exist=0;
               //localStorage.setItem('userData', JSON.stringify(Jres.data));
               this.alertService.success('You have added this property in featured list.', true);
               this.userProperties();
            }
            //console.log(Jres.Ack,' ack');
            //this.banner_small_text=res.data;
        });
      }
    });

    handler.open({
      name: this.translate.instant('siteTitle',this.commonService.settingsData),
      description:  this.translate.instant('subscriptionsText','Fetaured price'),
      amount: amnt*100
    });

  }

  private payPalMethod(propId,amnt,featured): void {
    console.log(propId,amnt,featured,'paypal');
    let userDataObj=this.loginData;
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AVYm7LQrZbsHNd1VmnAfOSegoN6FT8Yi8GyZqxLDLpfIdqyblAvyZaCUyJ8672SEOQf_un0d6sSKav56',
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log(data,'data');
        console.log(actions,'actions');
        console.log('OnPaymentComplete');
        let data1={prop_id:propId,user_id:userDataObj.id,featured:featured,token:data.paymentID,method:"PayPal"};
        this.commonService.post('doFeature',data1).subscribe((res)=>{
            //console.log(res._body,' after signup');
            window.scrollTo(0, 0);
            this.modalRef.hide();
            let Jres=JSON.parse(res._body);
            console.log(Jres,' after parse do feature');
            if(Jres.Ack==0){
              //this.is_email_exist=1;
            }else{
               //this.is_email_exist=0;
               //localStorage.setItem('userData', JSON.stringify(Jres.data));
               this.alertService.success('You have added this property in featured list.', true);
               this.userProperties();
            }
            //console.log(Jres.Ack,' ack');
            //this.banner_small_text=res.data;
        });
      },
      onCancel: (data, actions) => {
        console.log(data,'data');
        console.log(actions,'actions');
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: amnt
        }
      }]
    });
  }

    

   
  

}
