import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
    
    public pageData:any;
    constructor(private commonService: CommonServiceService) { }

    ngOnInit() {
    this.commonService.getStaticPageData({'page_type':'selling'}).subscribe((res)=>{
          console.log(res.data);
          this.pageData=res.data;
          this.commonService.updateTitle(res.data.meta_title_en);
          this.commonService.updateDescription(res.data.meta_desc_en);
      });
    }

}
