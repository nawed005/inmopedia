import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
//import {Observable} from 'rxjs';
//import {startWith, map} from 'rxjs/operators';
import { Router, NavigationStart , ActivatedRoute, Params} from '@angular/router';
import { SearchField } from './searchField';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import { Property }    from './property';
import { CommonServiceService } from '../services/common-service.service';
import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral} from '@agm/core';



export interface minPrice {
  value: string;
  viewValue: string;
}
export interface maxPrice {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-property-listings',
  templateUrl: './property-listings.component.html',
  styleUrls: ['./property-listings.component.css']
})

export class PropertyListingsComponent implements OnInit {
    
    /* For AOT Build*/
    public minMaxPrice:boolean;
    
    @ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;
    
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



    @ViewChild('AgmMap') agmMap: AgmMap;

    search = new SearchField('Sell','',[],'','');
    postSearchData:any;
    
    propertyTypes:any;
    public prop_arr = [];
    public propertyShow1=true;
    public autocompVal:string;
    public tabs:string;
    
    settingsData={};
    markers: marker[];
    autoGroups = [];
    properties=[];
    propertyType:any;
    AllLanguage:any;
    
    model = new Property('', '', '');
    submitted = false;


    zoom: number = 8;

    // initial center position for the map
    lat: number = 51.673858;
    lng: number = 7.815982;

    clickedMarker(label: string, index: number) {
      console.log(`clicked the marker: ${label || index}`)
    }



    markerDragEnd(m: marker, $event: MouseEvent) {
      console.log('dragEnd', m, $event);
    }
    
    constructor(private commonService: CommonServiceService, private fb: FormBuilder,private route : ActivatedRoute) {
        //this.propertyShow1= false; // to toggle property div
        this.commonService.showLoader();
        this.commonService.getData().subscribe((res)=>{
            this.settingsData=res.data;
            console.log(this.settingsData,' after parse all properties settingsData');
        });

        /*route.params.forEach(
               (params : Params) => {
                   this.search.type = params["type"] || "";
                   this.search.autoField = params["auto"] || "";
                   //this.search.propertyType = params["prop"] || JSON.stringify([]);
                   this.search.minPrice = params["minPrc"] || "";
                   this.search.maxPrice = params["maxPrc"] || "";
               }
        ); */
        this.commonService.get('getAllLanguage').subscribe((res)=>{
            console.log(res,'getAllLanguage');
            this.AllLanguage=res.data;
        });
        
    } // close of Constructor

    getAllProperties(){
        console.log(this.search,' after parse all search field');
        this.postSearchData = this.search;
        
        if (this.prop_arr && this.prop_arr.length > 0) {
            this.postSearchData.propertyType = JSON.stringify(this.prop_arr);
        } else {
            this.postSearchData.propertyType = JSON.stringify([]);
        }
        
        this.commonService.post('getAllProperties',this.postSearchData).subscribe((res)=>{

            let Jres=JSON.parse(res._body);
            console.log(Jres,' after parse all properties');
            this.properties=Jres.data;

            this.markers=Jres.data;
            console.log(this.markers,' after parse all markers');
            this.commonService.hideLoader();
            
        });
    }

  ngOnInit() {

    this.commonService.get('getPropertyTypes').subscribe((res)=>{
        console.log(res,'getPropertyTypes');
        this.propertyTypes=res.data;
        console.log(this.propertyTypes,"property Types");
    }); 
    
    this.commonService.get('getSearchData').subscribe((res)=>{
        console.log(res,'getSearchData');
        /*
        if(this.search.autoField) {  
          this.autocompVal = this.search.autoField;
          console.log("if",this.autocompVal);
        } else { this.autocompVal = 'Select Landmark, Location '; console.log("else",this.autocompVal); }
         
        this.autoGroups = [
            CreateNewAutocompleteGroup(
                this.autocompVal,
                'completer',
                res.data,
                {titleKey: 'label', childrenKey: null}
                //{titleKey: 'label', childrenKey: null},'',false
            ),
        ];				  
        console.log(this.autoGroups,'this.autoGroups');  */
    }); 

    this.commonService.getStaticPageData({'page_type':'property_listings'}).subscribe((res)=>{
        this.commonService.updateTitle(res.data.meta_title_en);
        this.commonService.updateDescription(res.data.meta_desc_en);
    });
    
    if(sessionStorage.homeSearchData) {
        console.log(sessionStorage.getItem('homeSearchData'));
        this.search = JSON.parse(sessionStorage.getItem('homeSearchData'));

        let ini_search = JSON.parse(sessionStorage.getItem('homeSearchData'));
        let ini_prop_arr = JSON.parse(ini_search.propertyType);
        if(ini_prop_arr){ this.prop_arr = ini_prop_arr; }
        
        if (this.search.type) {this.tabs = this.search.type } else { this.tabs = 'Sell'; }

        sessionStorage.clear();
        this.getAllProperties(); /* calling of search properties */
            
    } else {
        this.tabs = 'Sell';
        this.getAllProperties(); /* calling of search properties */
    }
     	
  }
  
    /* is property type checkbox box checked*/
    /* is property type checkbox box checked*/
    lookForSelected(prop_id){
        // console.log("property type array value",this.prop_arr);
        let check_index=this.prop_arr.indexOf(String(prop_id));
        if (Number(check_index) > -1) { 
            //console.log("true val index & prop_id ", check_index, String(prop_id));
            return true;
        } else {
           //console.log("false val index & prop_id ", check_index, String(prop_id)); 
           return false; 
        }
    }
    /* is property type checkbox box checked*/
    /* is property type checkbox box checked*/
    
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

    onSubmit() {
        console.log(this.search,'searchSubmit');
	this.getAllProperties();
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
        this.autocompVal = event.target.value;
    }
    
    toggleTabs(type){
        this.tabs = type;
        this.search.type = type;
        console.log(this.search);
    }


} // close of Class

interface marker { // MAP marker Interface
    latitude: number;
    longitude: number;
    label?: string;
    draggable: boolean;
}


