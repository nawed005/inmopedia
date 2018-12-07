import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';
@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {

  public pageData:any;
  constructor(private commonService: CommonServiceService) { }

  ngOnInit() {
     this.commonService.getStaticPageData({'page_type':'privacy-policy'}).subscribe((res)=>{
        //console.log(res,'legal data');
        this.pageData=res.data;
        this.commonService.updateTitle(res.data.meta_title_en);
        this.commonService.updateDescription(res.data.meta_desc_en);
    });
  }

}
