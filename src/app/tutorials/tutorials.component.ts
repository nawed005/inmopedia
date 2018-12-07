import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {
    
public tutorials=[];
constructor(private sanitizer: DomSanitizer,private commonService: CommonServiceService) {}
  
public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
	
  ngOnInit() {
        this.commonService.post('all_tutorials').subscribe((res)=>{
            let Jres=JSON.parse(res._body);
            console.log(Jres,'all_tutorials');
            this.tutorials=Jres.data;
            this.commonService.hideLoader();
        });
    }
  }


