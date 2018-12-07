import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
    
  /* For AOT Build*/  
  public pageData:any; 
  
  constructor(private commonService: CommonServiceService) { }

  ngOnInit() {
   this.commonService.getStaticPageData({'page_type':'buying'}).subscribe((res)=>{
        //console.log(res);
        this.pageData=res.data;
        this.commonService.updateTitle(res.data.meta_title_en);
        this.commonService.updateDescription(res.data.meta_desc_en);
    });
  }

}
