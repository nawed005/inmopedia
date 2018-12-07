import { Injectable } from '@angular/core';

import {  Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';
import {PlatformLocation } from '@angular/common';

import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class CommonServiceService {
  loading:boolean;
  userLoggedIn : boolean = false;

  userType:string='';
  //service_url='';

  //service_url='http://localhost:4200/api/';
 //service_url='http://honestweb.website/dev18/inmopedia/backend/public/api/';
 service_url='https://www.inmopedia.com/backend_new/public/api/';

  lang:string;
  realRath:string;
  private _host: string;
  private _authToken;
  private _options: RequestOptions;
  UserData:any;
  loginData=localStorage.getItem('loginData');
   settingsData={site_url:''};

   title:string;
   redirectUrl:string;
   hashPath:string;

  constructor (
    private http: Http,
    private platformLocation: PlatformLocation,
    private router: Router,
    private pageTitle: Title,
    private pageMeta: Meta
  ) {
      this._host = (platformLocation as any).location.origin; // Your Host here, get it from a configuration file
      this._authToken = window.btoa("xigmavoip:E&UCeCE2cep["); // Your token here, get it from API

  console.log('services');
  console.log((platformLocation as any).location);
    console.log((platformLocation as any).location.href);
    this.realRath=(platformLocation as any).location.href;
    console.log((platformLocation as any).location.origin);
    //this.service_url=(platformLocation as any).location.origin+'/api/';

    this.hashPath=(platformLocation as any).location.hash;

    console.log((platformLocation as any).location.hash,'this.hashPath');

    this.getData().subscribe(settingsData => {
            this.settingsData = settingsData.data;
            console.log(this.settingsData,'settingsData from service');
        });
   this.loginData=localStorage.getItem('loginData'); 
   if(this.loginData) {
     this.userLoggedIn= true; 
   }
   
   
   if(this.loginData){
     let data=JSON.parse(this.loginData);
     console.log(data,'login datatata');
     this.UserData=data;
    console.log(this.UserData,'login UserData');
   }else{
     this.UserData='';
   }
   
    
  }

   getData() {
    const options = this.createAuthorizationHeader();
    return this.http.get(this.service_url+'siteSettings', options).map(data => data.json());
  }

  getStaticPageData(postData){
  const options = this.createAuthorizationHeader();
    console.log(postData,'poast adata');
    /*return Observable.of([
        {
           'name':'hello'
        }
    ]);*/
    //return {'name':'hello'};
    return this.http.post(this.service_url+'staticPageData',postData, options).map(data => data.json());
  }


  getLangData(postData){
  const options = this.createAuthorizationHeader();
    console.log(postData,'poast adata');
    return this.http.post(this.service_url+'langData',postData, options).map(data => data.json());
  }

   getWhyInmopedia(){
   const options = this.createAuthorizationHeader();
    return this.http.get(this.service_url+'whyInmopedia', options).map(data => data.json());
  }

  getSubscriptionPlans(){
    const options = this.createAuthorizationHeader();
    return this.http.get(this.service_url+'getSubscriptionPlans', options).map(data => data.json());
  }

   get(url?: string, data?: Object): Observable<any> {
      const options = this.createAuthorizationHeader();
      return this.http.get(this.service_url +  url, options).map(data => data.json());
    }


  post(url?: string, data?: Object): Observable<any> {
      const body = JSON.stringify(data);
      const options = this.createAuthorizationHeader();
      console.log(this.service_url + url,'reg post data')
      return this.http.post(this.service_url + url, body, options);
  }


  createAuthorizationHeader(): RequestOptions {
      // Just checking is this._options is null using lodash
      if ((!this._options)) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', "Basic " + this._authToken);
        this._options = new RequestOptions({headers: headers});
      }
      return this._options;
   }



    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.loginData=localStorage.getItem('loginData');
    //console.log(loginData);
    if (this.loginData) {
      return true;
    } else {
      this.router.navigateByUrl('/sign-in');
      return false;
    }
  }

  CanDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.loginData=localStorage.getItem('loginData');
    //console.log(loginData);
    if (!this.loginData) {
      return true;
    } else {
      this.router.navigateByUrl('/profile');
      return false;
    }
  }




   upload(postData){
   const options = this.createAuthorizationHeader();
    console.log(postData,'poast adata');
    return this.http.post(this.service_url+'updateProfile',postData).map(data => data.json());
  }

   uploadProperty(postData){
   const options = this.createAuthorizationHeader();
    console.log(postData,'poast adata');
    return this.http.post(this.service_url+'postProperty',postData).map(data => data.json());
  }


    changeLoginStatus(status: boolean){
        this.userLoggedIn = status;
         if(status){
           this.loginData=localStorage.getItem('loginData');
           let data=JSON.parse(this.loginData);
           this.UserData=data;
           console.log(this.UserData,'this.UserData');
         }else{
           this.UserData='';
         }
        
    }

    getSettingsData(){
       
      return this.settingsData;
      
    }


   getImgSrc(img:any){
    return this.settingsData.site_url+'files/'+img.hash+'/'+img.name;

   }
   
   
    showLoader(): void {
    this.loading = true;
        console.log('Show loader');
    }
  
    hideLoader(): void {
    this.loading = false;
        console.log('Hide loader');
    }



    changedTitle(val){
      this.title=`- ${val}`;
      console.log(val,'page title');
    }


    updateTitle(title: string) {
    console.log(title,'page title');
    this.pageTitle.setTitle(title);
  }

  updateDescription(desc: string) {
    console.log(desc,'meta desc');
    this.pageMeta.updateTag({ name: 'description', content: desc })
  }

  getHashPath(){
    return (this.platformLocation as any).location.hash;
  
  }

  getRealPath(){
    return (this.platformLocation as any).location.href;
  }
  
  updateRedirectUrl(url){
    this.redirectUrl=url;
    console.log(this.hashPath,'this.hashPath');
    console.log(this.redirectUrl,'this.redirectUrl');
  }

  updateLang(lang){
    this.lang=lang;
  }

  getLang(){
    return this.lang;
  }

  getSlug(str){
    if(str!=''){
      return str.replace(/[^A-Z0-9]/ig, "-").toLowerCase();
    }else{
      return str;
    }
    
  }





}


interface loginDataType {
    type: string;
}
