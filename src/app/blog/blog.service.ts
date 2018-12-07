import { Injectable } from '@angular/core';

import {  Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';
import {PlatformLocation } from '@angular/common';



import { Blog } from './blog';
import { BLOGS } from './blogs';
import { MessageService } from './message.service';

@Injectable()
export class BlogService {

 //service_url='http://localhost:4200/api/';
 //service_url='http://honestweb.website/dev18/inmopedia/backend/public/api/';
 service_url='https://www.inmopedia.com/backend_new/public/api/';
 private _authToken;
  private _options: RequestOptions;

 Blogs;
  constructor(private messageService: MessageService,private http: Http,platformLocation: PlatformLocation) { 

   //this.service_url=(platformLocation as any).location.origin+'/api/';
   this._authToken = window.btoa("xigmavoip:E&UCeCE2cep["); // Your token here, get it from API
  }
  getBlogs() {
    const options = this.createAuthorizationHeader();
    //this.messageService.add('BlogService: fetched blogs');
    //return of(BLOGS);
    
    return this.http.get(this.service_url+'getBlogs',options).map(data => data.json());
  }
  getBlog(postData) {
    const options = this.createAuthorizationHeader();
    return this.http.post(this.service_url+'getBlogsDetails',postData,options).map(data => data.json());
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

}
