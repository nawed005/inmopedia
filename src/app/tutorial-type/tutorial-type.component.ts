import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { CommonServiceService } from '../services/common-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutorial-type',
  templateUrl: './tutorial-type.component.html',
  styleUrls: ['./tutorial-type.component.css']
})

export class TutorialTypeComponent implements OnInit {

    constructor(private sanitizer: DomSanitizer,private commonService: CommonServiceService,private route: ActivatedRoute) { }
    
    public tutorials=[];
    getTutorials(user_type){
        this.commonService.post('more_tutorial',{user_type:user_type}).subscribe((res)=>{
            let Jres=JSON.parse(res._body);
            console.log(Jres,'more_tutorial');
            this.tutorials=Jres.data;
            this.commonService.hideLoader();
        });
    };
    
    public getSantizeUrl(url : string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {      
            this.getTutorials(params['slug']);
        });
    }
}
