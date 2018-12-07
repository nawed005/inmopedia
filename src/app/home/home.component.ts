import { Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { SearchField } from './searchField';
import {Router} from '@angular/router';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Contact } from './contact';
import { AlertService } from '../services/alert.service';

//lang
import { TranslateService } from '@ngx-translate/core';
//lang

import { Property }    from './property';
import { CommonServiceService } from '../services/common-service.service';
import { AppComponent } from '../app.component';

export interface StateGroup {
  letter: string;
  names: string[];
}
export interface minPrice {
  value: string;
  viewValue: string;
}
export interface maxPrice {
  value: string;
  viewValue: string;
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    
    /* For AOT Build */
    public minMaxPrice:boolean;
    public whyinmopedia:any;
    public settingData:any;
    
    configTestColumn:SwiperConfigInterface;
    slideConfig = { 'slidesToShow': 4, 'slidesToScroll': 4 };
	
  
  minPrices: minPrice[] = [
    {value: '50', viewValue: '50 $'},
    {value: '100', viewValue: '100 $'},
    {value: '250', viewValue: '150 $'},
	{value: '200', viewValue: '200 $'},
	{value: '250', viewValue: '250 $'}
  ];
  maxPrices: maxPrice[] = [
    {value: '500', viewValue: '500 $'},
    {value: '1000', viewValue: '1000 $'},
    {value: '1500', viewValue: '1500 $'},
	{value: '2000', viewValue: '2000 $'},
	{value: '2500', viewValue: '2500 $'}
  ];
  
  propertyTypes:any;

  homeBanner()
  {
	return "url('assets/images/banner.jpg')";
  }
  banner_caption_small="We Helps You Find Out Your Need";
  banner_caption_big="Let's explore";
  
  public prop_arr = [];
  public propertyShow1=true;
  public tabs:string;
  
  model = new Property('', 'Property Type', 'Budget');
  submitted = false;
  featureProperties:any;
  paidProperties:any;
  about_section_image = "assets/images/real-estate-home-exterior.jpg";
	
	
  
   city1Properties:any;
   city1Count:string;
   
   city2Properties:any;
   city2Count:string;
   
   city3Properties:any;
   city3Count:string;
   
   city4Properties:any;
   city4Count:string;
   
   city5Properties:any;
   city5Count:string;
   
   city6Properties:any;
   city6Count:string;
   
   otherProperties:any;
   cityotherCount:string;

   partners:any;
   oneAtATime: boolean = true;
   agents_background = "assets/images/agents-background-img.jpg";
   agents:any;
   AllLanguage:any;

    modalRef: BsModalRef;
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
	  
  constructor(private modalService: BsModalService, private commonService: CommonServiceService, private fb: FormBuilder,private router: Router, private translate: TranslateService, private alertService: AlertService) {}
    
    banner_small_text={};
    banner_big_text={};
    cities={};
    autoGroups= [];
    provinces=[];
    currentCity:string;
 
  ngOnInit() {
     this.tabs = 'Sell';
     this.stateGroupOptions = this.contact_form.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
	  
      this.commonService.getData().subscribe((res)=>{
        console.log(res,'home compo');
        this.settingData=res.data;

       });
    
  
     console.log(this.settingData,'home component');
     this.commonService.getLangData({'item':'HOME_BANNER_SMALL_TEXT'}).subscribe((res)=>{
        console.log(res,' lang data baaner small text');
        this.banner_small_text=res.data;
    });

    this.commonService.getLangData({'item':'HOME_BANNER_BIG_TEXT'}).subscribe((res)=>{
        console.log(res,' lang data baaner big text');
        this.banner_big_text=res.data;
    });

    this.commonService.getWhyInmopedia().subscribe((res)=>{
        console.log(res,'why inmopedia');
        this.whyinmopedia=res.data;
    });

     
    this.commonService.get('getProvinces').subscribe((res)=>{
        console.log(res,'home getProvinces');
        this.provinces=res.data;

    });
   
    this.commonService.get('getHomeCities').subscribe((res)=>{
        console.log(res,'get getHomeCities');
        this.cities=res.data;
    }); 

    this.commonService.get('getHomeAgents').subscribe((res)=>{
        console.log(res,'get getHomeAgents');
        this.agents=res.data;
    }); 
    this.commonService.get('getHomePartners').subscribe((res)=>{
        console.log(res,'get getHomePartners');
        this.partners=res.data;
    }); 


    this.commonService.get('getPropertyTypes').subscribe((res)=>{
        console.log(res,'getPropertyTypes');
        this.propertyTypes=res.data;

    }); 
    

    this.commonService.getStaticPageData({'page_type':'home'}).subscribe((res)=>{
        //console.log(res);
        this.commonService.updateTitle(res.data.meta_title_en);
        this.commonService.updateDescription(res.data.meta_desc_en);
    });

    

    this.commonService.get('getFeatureProperties').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getFeatureProperties');
        this.featureProperties=res.data;
		this.configTestColumn= {
			direction: 'horizontal',
			slidesPerView: 3,
			slidesPerColumn: 3,
			slidesPerColumnFill: 'column',
			spaceBetween: 0,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			  },
			  navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			  },
		  };
    });


    this.commonService.get('getPaidProperties').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getPaidProperties');
        this.paidProperties=res.data;
	});
	




	this.commonService.get('getCity1Properties').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getCity1Properties');
		this.city1Properties=res.data;
                this.city1Count=res.count;
		//this.currentCity=res.locationInfo.city;
	}); 
	this.commonService.get('getCity2Properties').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getCity2Properties');
            this.city2Properties=res.data;
            this.city2Count=res.count;
            //alert(this.city2Count);
		
	});
	this.commonService.get('getCity3Properties').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getCity3Properties');
        this.city3Properties=res.data;
        this.city3Count=res.count;
	});
	this.commonService.get('getCity4Properties').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getCity4Properties');
        this.city4Properties=res.data;
        this.city4Count=res.count;
	});
	this.commonService.get('getCity5Properties').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getCity5Properties');
        this.city5Properties=res.data;
        this.city5Count=res.count;
	});

	this.commonService.get('getCity6Properties').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getCity6Properties');
        this.city6Properties=res.data;
        this.city6Count=res.count;
	});
	
	this.commonService.get('getOtherProperties').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getOtherProperties');
        this.otherProperties=res.data;
        this.cityotherCount=res.count;
	});
	
	this.commonService.get('getAllLanguage').subscribe((res)=>{
        //console.log(res);
        console.log(res,'getAllLanguage');
        this.AllLanguage=res.data;
        /*
        let lang=this.translate.instant('PROPERTY_SEACRH_BY_KEYWORD_PLACEHOLDER',res.data)
        this.commonService.get('getSearchData').subscribe((res)=>{
            console.log(res,'getSearchData');
            this.autoGroups = [
            CreateNewAutocompleteGroup(
                    'Select Landmark, Location',
                    'completer',
                    res.data,
                    {titleKey: 'label', childrenKey: null}
                    //{titleKey: 'label', childrenKey: null},'',false
            ),
            ];						  
            console.log(this.autoGroups,'this.autoGroups');
        }); */
        
    });
	

    
  
  }

contact_form: FormGroup = this.fb.group({
    stateGroup: '',
  });

  stateGroups:any = [{
    letter: 'Projects',
    names: ['Alabama','Alaska','Arizona','Arkansas']
  }, {
    letter: 'Location',
    names: ['California','Colorado','Connecticut']
  }];

  stateGroupOptions: Observable<StateGroup[]>;


  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  autoClick(name){
   console.log(name,'autoClick');

  }

    /* home search Start */ /* home search Start */
    /* home search Start */ /* home search Start */
    
    search = new SearchField('Sell','',[],'','');
    updateSelectedCharacters(event) {
        //console.log("In Every function call",this.prop_arr);
        let arr_index=this.prop_arr.indexOf(event.target.name);
        
        if (event.target.checked) {
            //alert(event.target.name);
            if (Number(arr_index) == -1 ) { 
                this.prop_arr.push(event.target.name);
                console.log("propertyType pushed", this.prop_arr);
            }
        } else {
            //alert(event.target.name);
            if (Number(arr_index) > -1) {
                this.prop_arr.splice(this.prop_arr.indexOf(event.target.name), 1);  
                console.log("propertyType spliced", this.prop_arr);            
            }
        }
        
        console.log("propertyType arr", this.prop_arr);            
    }
  
    changeMinPrice(event){
        console.log(event.value,'min price');
        this.search.minPrice=event.value;
    }

    changeMaxPrice(event){
        console.log(event.value,'max price');
        this.search.maxPrice=event.value;
    }

   
    /*	
    changeAutoField(event){
        console.log(event,'changeAutoField');
        if(event.item) {
            this.search.autoField=event.item.id; 
            console.log(this.search.autoField);
        } else {
          //this.search.autoField="";
          console.log(this.search.autoField);      
        }
    } */
    
    onKey(event:any) { // without type info
        this.search.autoField = event.target.value;
    }


    toggleTabs(type){
        this.tabs = type;
        this.search.type = type;
    }

    onSubmit() {
        if (this.prop_arr) { 
            this.search.propertyType = JSON.stringify(this.prop_arr); 
        } else {
            this.search.propertyType = JSON.stringify([]); 
        }
        
        sessionStorage.setItem('homeSearchData', JSON.stringify(this.search));
        console.log(sessionStorage.getItem('homeSearchData'));
        this.router.navigate(['/property-listings']);
        
    }
    
    onBrowse(province_city) {
        
        this.search.propertyType = JSON.stringify([]); 
        this.search.autoField = province_city;
        
        sessionStorage.setItem('homeSearchData', JSON.stringify(this.search));
        console.log(sessionStorage.getItem('homeSearchData'));
        this.router.navigate(['/property-listings']);
    }
    
     

    /* home search end */ /* home search end */
    /* home search end */ /* home search end */
	
    cmodel = new Contact('', '', '', '');
    activeClass='';
    contactSubmit(f){

      f.value.type='Via Contact Form';
      f.value.property_id=0;
      this.activeClass = "active";
      window.scrollTo(0, 0);
      console.log(f.value,'Contact form attribute');
       this.commonService.post('leadSubmit',f.value).subscribe((res)=>{
		this.modalRef.hide()
        console.log(res._body,' after contactSubmit');
        let Jres=JSON.parse(res._body);
        //console.log(Jres,' after parse contactSubmit');
        if(Jres.Ack==0){
           this.activeClass = "";
        }else{
            this.activeClass = "";
            f.resetForm();
           this.alertService.success('You contacted successfully.', true);
        }
        });  

    }
	
	max = 5;
	  rate = 0;
	  isReadonly = false;
	 
	  overStar: number;
	  percent: number;
	 
	  hoveringOver(value: number): void {
		this.overStar = value;
		this.percent = (value / this.max) * 100;
	  }
	 
	  resetStar(): void {
		this.overStar = void 0;
	  }
	  


	  isReadonlyUser: boolean = true;
	  ratings:any;
          
} // end of class
