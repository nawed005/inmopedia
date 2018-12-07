import { Component, OnInit } from '@angular/core';

import { CommonServiceService } from '../services/common-service.service';

import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
    
  /* For AOT Build*/  
  public pageData:any;
  public pageDesc:any;
  
  constructor(public commonService: CommonServiceService,private domSanitizer:DomSanitizer) { }
  
  ngOnInit() {

    this.commonService.getStaticPageData({'page_type':'tutorial'}).subscribe((res)=>{
        //console.log(res);
        res.data.desc_en = this.domSanitizer.bypassSecurityTrustHtml(res.data.desc_en);
        res.data.desc_sp = this.domSanitizer.bypassSecurityTrustHtml(res.data.desc_sp);

        this.pageData=res.data;
        
        this.commonService.updateTitle(res.data.meta_title_en);
        this.commonService.updateDescription(res.data.meta_desc_en);
    });
  }

}
