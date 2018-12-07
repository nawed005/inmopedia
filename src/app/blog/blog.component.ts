import { Component, OnInit } from '@angular/core';
import { Blog } from './blog';
import { BlogService } from './blog.service';

import { CommonServiceService } from '../services/common-service.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs=[];
  settingData=[];
  AllLanguage:any;

  constructor(private blogService: BlogService,private commonService: CommonServiceService) { 

    this.commonService.get('getAllLanguage').subscribe((res)=>{
      //console.log(res);
      console.log(res,'getAllLanguage');
      this.AllLanguage=res.data;
  
  
    });
  }

  ngOnInit() {
    this.commonService.getData().subscribe((res)=>{
        console.log(res);
        this.settingData=res.data;

        /*if(this.settingData.language_en=='English'){
           this.translate.setDefaultLang('en');
        }else{
           this.translate.setDefaultLang('sp');
        }*/
        

    });
    this.getBlogs();

    this.commonService.getStaticPageData({'page_type':'blog'}).subscribe((res)=>{
        //console.log(res);
        this.commonService.updateTitle(res.data.meta_title_en);
        this.commonService.updateDescription(res.data.meta_desc_en);
    });
  }
  
  getBlogs(): void {
    this.blogService.getBlogs()
    .subscribe(res =>{
    console.log(res,'blogs data');
    this.blogs = res.data;
    });
    }

}
