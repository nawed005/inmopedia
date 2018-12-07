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
  selector: 'app-general-component',
  templateUrl: './general-component.component.html',
  styleUrls: ['./general-component.component.css']
})
export class GeneralComponentComponent implements OnInit {
    
    AllLanguage:any;
    loginData:any;
    settingsData:any;
    leads:any;
    messageToggle = {};

    constructor(private commonService: CommonServiceService,private alertService: AlertService,private router: Router, private modalService: BsModalService, private translate: TranslateService) { 

        this.loginData=JSON.parse(this.commonService.loginData);

        this.commonService.getData().subscribe((res)=>{
            this.settingsData=res.data;
        });

        this.commonService.get('getAllLanguage').subscribe((res)=>{
          //console.log(res);
          console.log(res,'getAllLanguage');
          this.AllLanguage=res.data;
        });

        this.commonService.post('getGeneralLeads',{userId:this.loginData.id}).subscribe((res)=>{
          //console.log(res);
          let Jres=JSON.parse(res._body);
          console.log(Jres,' after parse getGeneralLeads');
          this.leads=Jres.data;
          console.log(this.leads,' after parse getGeneralLeads');
        });
    }

    ngOnInit() {}

}
