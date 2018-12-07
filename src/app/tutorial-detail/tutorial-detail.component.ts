import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { CommonServiceService } from '../services/common-service.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-tutorial-detail',
  templateUrl: './tutorial-detail.component.html',
  styleUrls: ['./tutorial-detail.component.css']
})
export class TutorialDetailComponent implements OnInit {
    
    constructor(private sanitizer: DomSanitizer,private commonService: CommonServiceService,private route: ActivatedRoute,public toastService:ToastService,private translate: TranslateService) {}
    
    public tutorial:any;
    public AllLanguage:any;
    
    getTutorialDetails(slug){
        this.commonService.post('tutorialDetails',{slug:slug}).subscribe((res)=>{
            let Jres=JSON.parse(res._body);
            console.log(Jres,'tutorialDetails');
            if(Jres.Ack==1){
                if(Jres.data.payment_type=='Free'){ // Free Tutorial
                    this.tutorial=Jres.data;
                    
                } else { // Paid Tutorial
                
                    if(this.commonService.userLoggedIn){ // user is Loggedin 
                        
                        console.log("user data",this.commonService.UserData);
                        this.commonService.post('CheckUserCurrentPlan',{user_id:this.commonService.UserData.id}).subscribe((res1)=>{
                            console.log(res,'CheckUserCurrentPlan');
                            let Jres1=JSON.parse(res1._body);
                            if(Jres1.Ack==0){ // user is subscribed to a plan
                                if(Jres1.isfree == 1){ // user is in free plan 
                                    this.toastService.openSnackBar("Error", "Tutorials are not for free plan!");
                                } else { // user is in paid plan 
                                    this.tutorial=Jres.data;
                                }
                            } else { // user is not subscribed to a plan
                                this.toastService.openSnackBar("Error", "You are not subscribed to a plan!");
                            }
                        });  
                        
                    } else { // user is not Loggedin 
                        this.toastService.openSnackBar("Error", this.translate.instant('THIS_TUTORIAL_IS_FOR_PAID_USERS', this.AllLanguage));
                    } //close of user logged in else if
                    
                } //close of Payment else if
                
            } else { // No Tutorial is there
               this.toastService.openSnackBar("Error", "Tutorial not found!"); 
            } //close of Ack if
            
            this.commonService.hideLoader();
        });
    };
    
    public getSantizeUrl(url : string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    ngOnInit() {
        
        this.commonService.get('getAllLanguage').subscribe((res)=>{
            console.log(res,'getAllLanguage');
            this.AllLanguage=res.data;   
        });
        
        this.route.params.subscribe((params) => {      
            this.getTutorialDetails(params['slug']);
        });
        
        
    }

}
