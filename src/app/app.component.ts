import {AfterViewInit, Component, Renderer2, OnInit } from '@angular/core';
import { Newsletter } from './newsletter';
import { AlertService } from './services/alert.service';
import { SearchField } from './home/searchField';
//lang
import { TranslateService } from '@ngx-translate/core';
//lang
import { CommonServiceService } from './services/common-service.service';




import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
    
  onActivate(e, outlet){
    outlet.scrollTop = 0;
  }
  
  /* For Aot Build */
  public slidebarnav:boolean;   
  public email:string; 
  public settingData:any;
  /* For Aot Build */
  
  search = new SearchField('Sell','',[],'','');
   
  loading;
  title = 'app';
  //settingData=[]; /* For Aot Build */
  lang: string;
  logo = "assets/images/logo.png";
  footer_logo = "assets/images/footer-logo.png";
  footerBackground()
  {
	return "url('assets/images/footer-bg.jpg')";
  }
  model = new Newsletter('');
  submitted = false;
  onSubmit() { this.submitted = true; }
  get diagnostic() { return JSON.stringify(this.model); }
  
  previousUrl: string;
  loginData='';
  name= 'rajib';
  user = {
    name: 'Arthur',
    age: 42
  };

  user1 = {
    name: 'Arthur1',
    age: 42
  };

public isLogin:string;

AllLanguage:any;

  constructor(private renderer: Renderer2, private router: Router, public commonService: CommonServiceService, private translate: TranslateService, private alertService: AlertService) {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.previousUrl) {
          this.renderer.removeClass(document.body, this.previousUrl);
        }
        let currentUrlSlug = event.url.split('/');
                console.log(currentUrlSlug,'currentUrlSlug');
        if (currentUrlSlug[1]) {
          this.renderer.addClass(document.body, currentUrlSlug[1]);
        }
        this.previousUrl = currentUrlSlug[1];
      }
    });
    
    /* Check for default language */
    if (localStorage.defaultLanguage) {  
        this.lang=localStorage.getItem('defaultLanguage')
        this.translate.setDefaultLang(this.lang);
        this.commonService.updateLang(this.lang);
    } else {
        this.lang='sp';
        this.translate.setDefaultLang(this.lang);
        this.commonService.updateLang(this.lang);
    }
    
    /* Check for default language */
     
     //this.is_login=this.commonService.loginData;
    this.loginData=JSON.parse(this.commonService.loginData);
    
    this.commonService.getData().subscribe((res)=>{
        this.settingData=res.data;
        console.log(this.settingData,' after parse app compo settingData');
    });


    this.commonService.get('getAllLanguage').subscribe((res)=>{
        console.log(res,'getAllLanguage');
        this.AllLanguage=res.data;
    });
	 
  }

ngOnInit() {
	
     /*chnage route scroll top*/
     this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

      /*chnage route scroll top*/  
    
    
  }

  /* Change default language */  
  switchLanguage(language: string) {
      
    this.lang=language;
    this.translate.use(language);
    this.commonService.updateLang(language);
    localStorage.setItem('defaultLanguage', language);
    console.log(language,'switchLanguage');
    
  }
  
  onNavigate(ns_type){
      
      this.search.type = ns_type;
      this.search.propertyType = JSON.stringify([]); 
      
      sessionStorage.setItem('homeSearchData', JSON.stringify(this.search));
      console.log(sessionStorage.getItem('homeSearchData'));
      this.router.navigate(['/property-listings']);
      location.reload();
  }
  /* Change default language */  
  
  // Shows and hides the loading spinner during RouterEvent changes
  /*navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }
    if (event instanceof NavigationEnd) {
      this.loading = false
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }
  }*/
  



}
