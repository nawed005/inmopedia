import { Component, OnInit } from '@angular/core';


import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-price-your-home',
  templateUrl: './price-your-home.component.html',
  styleUrls: ['./price-your-home.component.css']
})
export class PriceYourHomeComponent implements OnInit {
    pageData=[];
  constructor(private commonService: CommonServiceService) { }

  ngOnInit() {
    this.commonService.getStaticPageData({'page_type':'price_your_home'}).subscribe((res)=>{
        //console.log(res);
        this.pageData=res.data;
        this.commonService.updateTitle(res.data.meta_title_en);
        this.commonService.updateDescription(res.data.meta_desc_en);
    });
  }

}
