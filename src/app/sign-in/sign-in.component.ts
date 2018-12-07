import { Component, OnInit, EventEmitter, ViewChild  } from '@angular/core';
import { Login }    from './login';
import { Register }    from './register';
import { CommonServiceService } from '../services/common-service.service';
 
import { AlertService } from '../services/alert.service';
import { ToastService } from '../services/toast.service';

import { Router } from '@angular/router';

import { Location } from '@angular/common';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { TabsetComponent } from 'ngx-bootstrap';

// for recptcha
export interface FormModel {
  captcha?: string;
}


declare const gapi: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  outputs: ['childEvent']
})


export class SignInComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;  
  public formModel: FormModel = {};   // for recptcha

  childEvent=new EventEmitter<string>();
  
  
  public auth2: any;

  model = new Login('', '');
  submitted = false;
  is_email_exist=0;
  is_user_name_exist=0;
  login_err_msg='';
  loginData='';
  public password_regex = "^(?=.*\d)(?=.*[!@#$%^&*()'"+"+,-_./?;:=<>~|\`\\[\\]\\{\\}\\)\\(])(?=.*[a-z])(?=.*[A-Z]).{8,}$";
  public isReadOnly = false;

  AllLanguage:any;
  constructor(private commonService: CommonServiceService,private router: Router, private alertService: AlertService,private location: Location, private authService: AuthService, public toastService:ToastService) { 
     this.loginData=JSON.parse(this.commonService.loginData);
     if(this.commonService.loginData){
        this.router.navigateByUrl('profile');
     }

     this.commonService.get('getAllLanguage').subscribe((res)=>{
      //console.log(res);
      console.log(res,'getAllLanguage');
      this.AllLanguage=res.data;
  
  
    });

     
  }
  
  is_log_err=0;
  ngOnInit() {

    this.commonService.getStaticPageData({'page_type':'sign_in'}).subscribe((res)=>{
        //console.log(res);
        this.commonService.updateTitle(res.data.meta_title_en);
        this.commonService.updateDescription(res.data.meta_desc_en);
    });
    
  }

// Login functionality starts
    activeClass='';
    onSubmit() {

        this.activeClass = "active";
        this.commonService.post('login',this.model).subscribe((res)=>{
            //console.log(res._body,' after login');
            let Jres=JSON.parse(res._body);
            console.log(Jres,' after parse login');
            this.activeClass = "";
            if(Jres.Ack==0){
              this.is_log_err=1;
              this.login_err_msg=Jres.msg;
            }else{
               this.is_email_exist=0;
                //this.childEvent.emit('1');

               localStorage.setItem('loginData', JSON.stringify(Jres.data));
               this.commonService.changeLoginStatus(true);
               //this.alertService.success('Registration successful', true);
                if(Jres.data.type=="Buyer"){
                    if (localStorage.tempData) { 
                         this.toastService.openSnackBar("Error", "Buyer can't add property"); 
                     }
                     this.router.navigateByUrl('/');
                     
                } else { // for rest of the user
                
                    if(localStorage.tempData) { 
                        //this.toastService.openSnackBar("Success", "Please post your property"); 
                        this.commonService.post('checkUserAlreadySubscribed',{user_id:Jres.data.id}).subscribe((res1)=>{ 
                            let Inner_res=JSON.parse(res1._body);
                            console.log(Inner_res,' Temp Api response');
                            if(Inner_res.Ack==0){ 
                                this.commonService.post('updateTempProperties',{"user_id":Jres.data.id,"tmp_id":localStorage.getItem('tempData')}).subscribe((res2)=>{ 
                                    let temp_res=JSON.parse(res2._body);
                                    console.log(temp_res,' Temp Api response');
                                    if(temp_res.Ack==1){
                                        console.log(temp_res.data);
                                        localStorage.removeItem('tempData');
                                        this.toastService.openSnackBar("Success", "Property Added successfully!");
                                        //this.router.navigate(['/edit-property',temp_res.data.prop_slug]);
                                        this.router.navigateByUrl('profile');
                                    } else { // temporary property checking else
                                        this.toastService.openSnackBar("Error", "No Property found!");
                                        this.router.navigateByUrl('profile');
                                    }
                                });
                            } else { // subscription checking else
                               //this.toastService.openSnackBar("Error", "Property Can't be updated");
                               this.router.navigateByUrl('subscription');  
                            }
                        });
                    // this.router.navigateByUrl('profile');    
                    } else { // local storage checking else
                        this.router.navigateByUrl('profile');
                    }

                }

            }
            //console.log(Jres.Ack,' ack');
            //this.banner_small_text=res.data;
        });

    }
// Login functionality ends  

  get diagnostic() {
    return JSON.stringify(this.model); 

  }
  
  
  // Register Function starts
  
  real_estate_agents = ['Buyer','Owner','Agent', 'Real Estate Pro', 'Real Estate Company','Project Developer'];
  model2 = new Register('','','', '', '', 'Agent','','Site','','');

  submitted2 = false;
  onSubmit2(f?:any) {
        //this.submitted2 = true; 
        console.log(this.model2,'reg from post data');
        //return false;
        this.activeClass = "active";
        this.commonService.post('signup',this.model2).subscribe((res)=>{

            //console.log(res._body,' after signup');
            let Jres=JSON.parse(res._body);
            console.log(Jres,' after parse signup');
            if(Jres.Ack==0){
              this.activeClass = "";
              this.is_email_exist=1;
            }else if(Jres.Ack==2){
              this.activeClass = "";
              this.is_user_name_exist=1;
            }else{
              //this.alertService.success('Registration successfull.Registration email sent to '+this.model2.email2+', please check your mail.', true);
               if(f){ f.resetForm(); }
               this.activeClass = "";
               this.is_email_exist=0;
               //localStorage.setItem('userData', JSON.stringify(Jres.data)); // previous logic
               localStorage.setItem('loginData', JSON.stringify(Jres.data));
               this.commonService.changeLoginStatus(true);

               if(Jres.data.type=='Buyer'){
                  localStorage.removeItem('tempData'); 
                  this.alertService.success('Your registration with inmopedia is successfull.Email sent to your register email id , please check your mail.', true);  
                  window.scrollTo(0, 0);
                  //this.router.navigate(['/sign-in']);
                  this.router.navigateByUrl('/');
                  //location.reload();
               } else {
                  this.router.navigateByUrl('subscription');
                }


            }
            //console.log(Jres.Ack,' ack');
            //this.banner_small_text=res.data;
        });
   
  }
  
  // Register Function Ends

  get diagnostic2() { return JSON.stringify(this.model2); }


  userNameType(){
    let str = this.model2.user_name;
    str = str.replace(/[^A-Z0-9]/ig, "-").toLowerCase();
    this.model2.user_name=str;
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (res) =>{
        
        this.model2.email2=res.email;
        this.model2.user_name=res.name;
        
        let res_name = res.name.split(" ");
        this.model2.first_name=res_name[0];
        this.model2.last_name=res_name[1];
        
        this.model2.login_type='Google';
        this.model2.gogl_id=res.id;
        
        this.model2.password2 = res.id+res_name[0].toUpperCase()+"_"+res_name[1]
        this.model2.confirmPassword=this.model2.password2
        
        this.userNameType(); 
        this.commonService.post('checkGoogleId',{gogl_id:this.model2.gogl_id,email:this.model2.email2}).subscribe((res1)=>{ 
            let Jres=JSON.parse(res1._body);
            console.log(Jres,' after parse checkGoogleId');
            if(Jres.Ack==1){
                this.socialLogin(Jres); 
            } else if(Jres.Ack==0) { 
                //this.onSubmit2(); 
                this.selectTab(1);
                this.isReadOnly = true;
            } else {
                this.toastService.openSnackBar("Error", "Account is inactive"); 
            }
        });  // close of facebook id checking
        
    }); // close of google login & Authentication
    
  } // close of google login & Authentication
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then( (res) =>{
        console.log(res);
        this.model2.email2=res.email;
        this.model2.user_name=res.name;
        this.model2.first_name=res.firstName;
        this.model2.last_name=res.lastName;
        this.model2.login_type='Facebook';
        this.model2.fb_id=res.id;
        this.model2.password2 = res.id+res.firstName.toUpperCase()+"_"+res.lastName
        this.model2.confirmPassword=this.model2.password2
        this.userNameType(); 
        
        this.commonService.post('checkFacebokId',{fb_id:this.model2.fb_id,email:this.model2.email2}).subscribe((res1)=>{ 
            let Jres=JSON.parse(res1._body);
            console.log(Jres,' after parse checkFacebokId');
            if(Jres.Ack==1){ 
                this.socialLogin(Jres); 
            } else if(Jres.Ack==0) { 
                //this.onSubmit2(); 
                this.selectTab(1);
                this.isReadOnly = true;
            } else {
                this.toastService.openSnackBar("Error", "Account is inactive"); 
            }
        });  // close of facebook id checking
        
    }); // close of facebook login & Authentication
  } // close of facebook login & Authentication
  
  
socialLogin(Jres:any) {
    this.is_email_exist=0;
    console.log(JSON.stringify(Jres.data),' after parse loginData');

    localStorage.setItem('loginData', JSON.stringify(Jres.data));
    this.commonService.changeLoginStatus(true);

    if(Jres.data.type=="Buyer"){

        if (localStorage.tempData) { 
            localStorage.removeItem('tempData');
            this.toastService.openSnackBar("Error", "Buyer can't add property"); 
        }

        this.router.navigateByUrl('/');
        window.location.reload();

    } else { 
        if(localStorage.tempData) { 
            //this.toastService.openSnackBar("Success", "Please post your property"); 
            this.commonService.post('checkUserAlreadySubscribed',{user_id:Jres.data.id}).subscribe((res2)=>{ 
                let Inner_res=JSON.parse(res2._body);
                console.log(Inner_res,' Temp Api response');
                if(Inner_res.Ack==0) { 
                    this.commonService.post('updateTempProperties',{"user_id":Jres.data.id,"tmp_id":localStorage.getItem('tempData')}).subscribe((res3)=>{ 
                        let temp_res=JSON.parse(res3._body);
                        console.log(temp_res,' Temp Api response');
                        if(temp_res.Ack==1){
                            console.log(temp_res.data);
                            localStorage.removeItem('tempData');
                            this.toastService.openSnackBar("Success", "Property Added successfully!");
                            //this.router.navigate(['/edit-property',temp_res.data.prop_slug]);
                            this.router.navigateByUrl('profile');
                        } else { // temporary property checking else
                            this.toastService.openSnackBar("Error", "No Property found!");
                            this.router.navigateByUrl('profile');
                        }
                    });
                } else { // subscription checking else
                   //this.toastService.openSnackBar("Error", "Property Can't be updated");
                   this.router.navigateByUrl('subscription');  
                }
            });
            // this.router.navigateByUrl('profile');    
        } else { // local storage checking else
            this.router.navigateByUrl('profile');
        }
        //window.location.reload();

    } // close of second else if
      
} // close of social login
 
  signOut(): void {
    this.authService.signOut();
  }

/*
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        //client_id: '463625157021-r0eimhoadmsk3be9tfup795jvj5lv4s8.apps.googleusercontent.com',
        client_id: '939452810278-54uj1ql2gvohe2a1kni4lc1kqts9a15c.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  
  
  public attachSignin(element) {
    
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE

        this.model2.email2=profile.getEmail();
        this.model2.user_name=profile.getName();
        this.model2.login_type='Google';
        this.model2.gogl_id=profile.getId();
        this.userNameType(); 
        
        this.commonService.post('checkGoogleId',{gogl_id:this.model2.gogl_id}).subscribe((res)=>{
          //console.log(res._body,' after login');
          let Jres=JSON.parse(res._body);
          console.log(Jres,' after parse checkGoogleId');
          
        if(Jres.Ack==0){
           
        } else {
            this.is_email_exist=0;
             //this.childEvent.emit('1');
            
            console.log(JSON.stringify(Jres.data),' after parse loginData');
            localStorage.setItem('loginData', JSON.stringify(Jres.data));
            this.commonService.changeLoginStatus(true);
            
            //this.alertService.success('Registration successful', true);
            if(Jres.data.type=="Buyer"){
                if (localStorage.tempData) { 
                    localStorage.removeItem('tempData');
                    this.toastService.openSnackBar("Error", "Buyer can't add property"); 
                }   
              this.router.navigateByUrl('/');
              window.location.reload();
            } else { // for rest of the user
            
                if(localStorage.tempData) { 
                    //this.toastService.openSnackBar("Success", "Please post your property"); 
                    this.commonService.post('checkUserAlreadySubscribed',{user_id:Jres.data.id}).subscribe((res1)=>{ 
                        let Inner_res=JSON.parse(res1._body);
                        console.log(Inner_res,' Temp Api response');
                        if(Inner_res.Ack==0) { 
                            this.commonService.post('updateTempProperties',{"user_id":Jres.data.id,"tmp_id":localStorage.getItem('tempData')}).subscribe((res2)=>{ 
                                let temp_res=JSON.parse(res2._body);
                                console.log(temp_res,' Temp Api response');
                                if(temp_res.Ack==1){
                                    console.log(temp_res.data);
                                    localStorage.removeItem('tempData');
                                    this.router.navigate(['/edit-property',temp_res.data.prop_slug]);
                                } else { // temporary property checking else
                                    this.toastService.openSnackBar("Error", "No Property found!");
                                    this.router.navigateByUrl('profile');
                                }
                            });
                        } else { // subscription checking else
                           //this.toastService.openSnackBar("Error", "Property Can't be updated");
                           this.router.navigateByUrl('subscription');  
                        }
                    });
                // this.router.navigateByUrl('profile');    
                } else { // local storage checking else
                    this.router.navigateByUrl('profile');
                }
                window.location.reload();
            } // for rest of the user
             
        }
          //console.log(Jres.Ack,' ack');
          //this.banner_small_text=res.data;
      });

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }  */

  ngAfterViewInit(){
    //this.googleInit();
}
  
  

}
