import { Component, OnInit } from '@angular/core';


import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit {

  public pageData:any;
  constructor(private commonService: CommonServiceService) { }

  ngOnInit() {
     this.commonService.getStaticPageData({'page_type':'legal'}).subscribe((res)=>{
        //console.log(res,'legal data');
        this.pageData=res.data;
        this.commonService.updateTitle(res.data.meta_title_en);
        this.commonService.updateDescription(res.data.meta_desc_en);
    });
  }

}
