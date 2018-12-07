import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Blog } from '../blog/blog';
import { BlogService } from '../blog/blog.service';

import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  @Input() blog: Blog;
  sameCat=[];
  AllLanguage:any;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
    private commonService: CommonServiceService
  ) {}
settingData=[];
id='';
  ngOnInit(): void {

  this.commonService.getData().subscribe((res)=>{
        console.log(res);
        this.settingData=res.data;

        /*if(this.settingData.language_en=='English'){
           this.translate.setDefaultLang('en');
        }else{
           this.translate.setDefaultLang('sp');
        }*/
        

    });

    this.route.params.subscribe(params => {
        this.id= params.id;
        this.getBlog();
        
    });

    this.commonService.get('getAllLanguage').subscribe((res)=>{
      //console.log(res);
      console.log(res,'getAllLanguage');
      this.AllLanguage=res.data;
  
  
    });

    
  }

  getBlog(): void {

    

    //const id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id,'blog id');
    this.blogService.getBlog({'id':this.id})
      .subscribe(blog =>{ 
      console.log(blog,'blog id data');
      this.blog = blog.data;
      this.sameCat = blog.sameCat;
      this.commonService.updateTitle(blog.data.meta_title);
      this.commonService.updateDescription(blog.data.meta_description);
      });
  }

}
