import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { Property } from './property';
import { Contact }    from './contact';
import { Video }    from './video';
import { Router, NavigationStart , ActivatedRoute, Params} from '@angular/router';
import { AlertService } from '../services/alert.service';
//lang
import { TranslateService } from '@ngx-translate/core';
//lang
import { CommonServiceService } from '../services/common-service.service';
import {MatSnackBar} from '@angular/material';  // using for toast message


export type tabstype = 'step1'|'step2'|'step3';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
tabstep:tabstype = 'step1';
get tabStep1(){
	return this.tabstep === 'step1';
}
get tabStep2(){
	return this.tabstep === 'step2';
}
get tabStep3(){
	return this.tabstep === 'step3';
}
toggleTab(type:tabstype){
	this.tabstep = type;
	window.scrollTo(0, 0);
}
//@ViewChild('propertyTabs') propertyTabs: TabsetComponent;    
loginData:any;
/*
selectTab(tab_id: number,propertyForm) {
  console.log(propertyForm,'Form data');
  this.propertyTabs.tabs[tab_id].active = true;
  window.scrollTo(0, 0)
}  */   
    
/* For AOT Build*/    
public addPhones:boolean;    

// Google Autocomplete
public userSettings4: any = { showSearchButton: false, geoCountryRestriction: ['EC'] };    
autoCompleteCallback1(selectedLocationData:any) {
    console.log(selectedLocationData,'selectedLocationData change');
    this.model.prop_address=selectedLocationData.data.description;
    this.model.latitude=selectedLocationData.data.geometry.location.lat;
    this.model.longitude=selectedLocationData.data.geometry.location.lng;
} 
	
otherInput: boolean;
  real_estate_agents = ['Agent', 'Relator/Real State Developer', 'Owner'];
	propertyYes: boolean;
	propertyNo: boolean;
  contacts: Array<Contact>;
  AllLanguage:any;
    addContact(other){
        let contact = new Contact(other);
        this.contacts.push(contact);
        console.log(this.contacts,'this.contacts');
    }

    removeContact(contact){
        let index = this.contacts.indexOf(contact);
        this.contacts.splice(index,1);

      
    }
	
    videos: Array<Video>;
    addVideo(othervideo){
        if(this.videos.length >=2) {
            this.openSnackBar("Error", "Can't add more than 2 videos")
        } else {
            let video = new Video(othervideo);
            this.videos.push(video);
        }
        
    }

    removeVideo(video){
        let indexvideo = this.videos.indexOf(video);
        this.videos.splice(indexvideo,1);
    }
	
  urls = [];
  prop_images=[];
  urls_cover = [];
  prop_images_cover=[];
  exist_prop_images=[];
  public del_images=[];

  detectFiles(event) {
    //this.urls = [];
    let files = event.target.files;
    
    if (files) {
		
       for(let i=0; i < files.length; i++){
        let file=files[i];
        
        if(this.prop_images.length > 0) { 
            this.prop_images.push(file); 
        } else{ 
            this.prop_images.push("");
            this.prop_images.push(file);
        }
        
        let reader = new FileReader();
        reader.onload = (e: any) => {
	let extension = file.name.split('.').pop().toLowerCase();
        this.urls.push({'type':extension,'src':e.target.result,'exist':0});
        }
        reader.readAsDataURL(file);
      }
	  console.log(this.prop_images,'this.prop_images');
    }
  }


  detectFilesCover(event) {
    //this.urls = [];
    let files = event.target.files;
    
    if (files) {
    
       for(let i =0; i < files.length; i++){
       let file=files[i];
       this.prop_images_cover=[file];
       //this.prop_images[0]=file;
       
        if(this.prop_images[0]) {
            this.prop_images.unshift(file); // inserting data to first position
        } else {
            this.prop_images[0]=file; // inserting data to first position
        }
       
        let reader = new FileReader();
        reader.onload = (e: any) => {
        let extension = file.name.split('.').pop().toLowerCase();
          this.urls_cover=[{'type':extension,'src':e.target.result,'exist':0}];
        }
        reader.readAsDataURL(file);
      }
    console.log(this.prop_images_cover,'this.prop_images_cover');
    }
  }
  
  property_types = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  //provinces = ['Provinces', 'Provinces', 'Provinces', 'Provinces'];
  //cities = ['City', 'City', 'City', 'City'];
  //zones = ['Zone', 'Zone', 'Zone', 'Zone'];
  bedrooms = ['0', '1', '2', '3','4','5','6','7','8','9','10'];
  baths = ['0', '1', '2', '3','4','5','6','7','8','9','10'];
  halfBaths = ['0', '1', '2', '3','4','5','6','7','8','9','10'];
  garages = ['0', '1', '2', '3','4','5','6','7','8','9','10'];
  
  model = new Property('','Sell', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Phone and Email', '','','', '', '', '', '', 1, 1, 1, 1, 'Good Shape',[],[],'','','','Yes');

  submitted = false;
  
  

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  propertyTypes:any;
  provinces:any;
  cities:any;
  zones:any;

  propertyId:number;
  propertyDetails:any;

  constructor(private commonService: CommonServiceService,private alertService: AlertService,private router: Router,private route : ActivatedRoute, public snackBar: MatSnackBar) { 
    this.contacts = [];
	this.videos = [];
    this.loginData=JSON.parse(this.commonService.loginData);

    this.commonService.get('getPropertyTypes').subscribe((res)=>{
        //console.log(res,'getPropertyTypes');
        this.propertyTypes=res.data;

    });
    this.commonService.get('getProvinces').subscribe((res)=>{
        //console.log(res,'getProvinces');
        this.provinces=res.data;

    });
    this.commonService.get('getCities').subscribe((res)=>{
        //console.log(res,'getCities');
        this.cities=res.data;

    });
    this.commonService.get('getZones').subscribe((res)=>{
        this.zones=res.data;
        //console.log(this.zones,'getZones');

    });

    this.commonService.get('getAllLanguage').subscribe((res)=>{
      //console.log(res);
      //console.log(res,'getAllLanguage');
      this.AllLanguage=res.data;
  
  });

  }
  
  // material snackbar toast message
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    
  }
  
  filteredCities:any;
  filteredZones:any;

  ngOnInit() {
      
    this.route.params.forEach(
       (params : Params) => {
           this.propertyId = params["id"];
       }
    );
    if(this.propertyId){
        //console.log(this.propertyId,'edit property id');
        this.commonService.post('getPropertyDetails',{prop_id:this.propertyId}).subscribe((res)=>{
          
            let Jres=JSON.parse(res._body);
            this.model=Jres.data;
            
            //console.log(Jres.data,"Video urls");
            
            // Property Videos display
            try {
                let videos=JSON.parse(Jres.data.video_urls);
                for(let i=0;i<videos.length;i++){
                    let video = new Video(videos[i]);
                    this.videos.push(video);
                }
            } catch (e) { this.videos = null; }
            
            // Property Character_Other display
            try {
                let other=JSON.parse(Jres.data.chracter_other);
                this.otherInput=true;
                for(let v=0;v<other.length;v++){
                    this.addContact(other[v]);
                }
                
            } catch (e) {console.log(e);}
            
            if(Jres.data.cover_image_file.length>0){
                let src=this.commonService.getImgSrc(Jres.data.cover_image_file[0]);
                let extension=Jres.data.cover_image_file[0].extension;
                this.urls_cover.push({'type':extension,'src':src,'exist':Jres.data.cover_image_file[0].id});  
            }
            
            if(Jres.data.all_images.length>0){
                for(let i=0;i<Jres.data.all_images.length;i++){
                    let src=this.commonService.getImgSrc(Jres.data.all_images[i]);
                    let extension=Jres.data.all_images[i].extension;
                    this.urls.push({'type':extension,'src':src,'exist':Jres.data.all_images[i].id});
                    this.exist_prop_images.push(Jres.data.all_images[i].id);
                }
            }
            
            this.model.other_character=JSON.parse(Jres.data.other_character); // for other Characters
            this.userSettings4['inputString'] = Jres.data.prop_address;
            this.userSettings4 = Object.assign({}, this.userSettings4);
            
            if(Jres.data.province_id){
                //this.filteredCities=this.transform(this.cities,String(Jres.data.province_id));
                this.commonService.post('GetAllCities',{province_id:Jres.data.province_id}).subscribe((res1)=>{  
                    let resCities=JSON.parse(res1._body);
                    this.filteredCities = resCities.data;
                    if(this.filteredCities){
                        this.commonService.post('GetAllZones',{city_id:Jres.data.city_id}).subscribe((res2)=>{  
                            let resZones=JSON.parse(res2._body);
                            this.filteredZones = resZones.data;
                        });
                    }
                    
                });
            }
           
        });

    } else {
        if(this.loginData) {
            this.commonService.post('checkUserSubscription',{user_id:this.loginData.id}).subscribe((res)=>{
               console.log(res,'checkUserSubscription');
               let Jres=JSON.parse(res._body);
               if(Jres.Ack==0){
                 this.alertService.success('Sorry your property can not be uploaded as you do not have a valid subscription. Please subscribe a paln to upload your properties.', true);
                 this.activeClass = "";
                 this.router.navigateByUrl('subscription');
               }else{
                 this.activeClass = "";
               }

            }); 
        }
    }


    this.commonService.getStaticPageData({'page_type':'add_property'}).subscribe((res)=>{
        //console.log(res);
        this.commonService.updateTitle(res.data.meta_title_en);
        this.commonService.updateDescription(res.data.meta_desc_en);
    });
    
  }
    
    
  
  changeProvince(selectedProvince:any){
      console.log(selectedProvince,"test value");
      //this.filteredCities=this.transform(this.cities,selectedProvince.target.value);
      this.commonService.post('GetAllCities',{province_id:selectedProvince.target.value}).subscribe((res1)=>{ 
        let resCities=JSON.parse(res1._body);
        this.filteredCities = resCities.data;
      });
  }

  changeCity(selectedCity:any){
      //this.filteredZones=this.transform1(this.zones,selectedCity.target.value);
      console.log(selectedCity,"selected city");
      this.commonService.post('GetAllZones',{city_id:selectedCity.target.value}).subscribe((res2)=>{  
        let resZones=JSON.parse(res2._body);
        this.filteredZones = resZones.data;
      });
  }

  transform(items: any[], race: any): any {
    let filteredArray = items.filter(function(itm){
      return race.indexOf(itm.province_id) > -1;
    });
    return filteredArray;
  }

  transform1(items: any[], race: any): any {
    let filteredArray = items.filter(function(itm){
      return race.indexOf(itm.city_id) > -1;
    });
    return filteredArray;
  }
activeClass = "";
  updateSelectedCharacters(event) {
    //console.log(event);
    this.model.other_character = this.model.other_character || [];
    if (event.target.checked) {
          if (this.model.other_character.indexOf(event.target.name) < 0) { 
                this.model.other_character.push(event.target.name);

          }
     } else {
           if (this.model.other_character.indexOf(event.target.name) > -1) 
            {
                this.model.other_character.splice(this.model.other_character.indexOf(event.target.name), 1);              
            }
    }
    //console.log("model.other_character: ", this.model.other_character);    
  }


  onSubmit() {
    
   //console.log(this.videos,'videos');
   //console.log(this.model,'onSubmit1');
   this.activeClass = "active";
   let _formData: FormData = new FormData();
   if(this.propertyId){
      _formData.append('prop_id', String(this.propertyId));
   }else{
       _formData.append('prop_id', '');
   }
   
   // with & without login user id
   if(this.loginData) {
       _formData.append('user_id', this.loginData.id);
       _formData.append('is_loggedin','1');
   } else {
      if (localStorage.tempData) { 
           _formData.append('user_id',localStorage.getItem('tempData'));
           _formData.append('is_loggedin','0');
      } else {
            let milliseconds = new Date().getTime();
            let user_id = "user_"+milliseconds;
            localStorage.setItem('tempData', user_id);  
            _formData.append('user_id',localStorage.getItem('tempData'));
            _formData.append('is_loggedin','0');
      }  
      
   }
    
    
    for ( let key in this.model ) {
        _formData.append(key, this.model[key]);
    }
   _formData.append('existFiles',this.exist_prop_images.toString());

   _formData.append('fileLength',String(this.prop_images.length));
   
    // Cover pic image
    if( this.prop_images[0] ) {
        _formData.append('CoverFile', this.prop_images[0], this.prop_images[0].name);
    } else { 
        _formData.append('CoverFile',"");   
    }
    
    if(this.del_images) {
        _formData.append('DeletedFile', JSON.stringify(this.del_images));  
    } else {
        _formData.append('DeletedFile',"");  
    }
    
    if( this.prop_images ) {
        for(let i=1;i<this.prop_images.length;i++){
          _formData.append('MyFile'+i, this.prop_images[i], this.prop_images[i].name);
        } 
    } 
    /*for(let i=0;i<this.prop_images.length;i++){ 
       _formData.append('MyFile['+i+']', this.prop_images[i]);
    }  image file pattern change*/ 
     
   let chracter_other=[];
   for(let i=0;i<this.contacts.length;i++){
      chracter_other.push(this.contacts[i].other);
   }
  _formData.append('chracter_other',chracter_other.toString());

  

   let othervideo=[];
   for(let i=0;i<this.videos.length;i++){
      othervideo.push(this.videos[i].othervideo);
   }
 _formData.append('video_urls',othervideo.toString());


    console.log(_formData,'_formData');
   this.commonService.uploadProperty(_formData).subscribe((res)=>{
        console.log(res,'uploadProperty');
        if(res.Ack==0){
          this.alertService.success('Sorry your property can not be uploaded as you do not have a valid subscription. Please subscribe a paln to upload your properties.', true);
          this.activeClass = "";
          this.router.navigateByUrl('subscription');
        }else{
          if(this.propertyId){
            this.alertService.success('Property updated successfully', true);
            
          }else{
            this.alertService.success('Property added successful please verify owner email to approve the property.', true);
            
          }

          this.activeClass = "";
          this.router.navigateByUrl('profile');
        }
		
    });
  }

  removeFile(fileIndex:number,exist_img:number) {

    if(confirm('Are you sure to remove this file?')){


    console.log(fileIndex,exist_img,'remove file fileIndex');
    
    this.urls.splice(fileIndex, 1);
    if(this.exist_prop_images.length>0 && exist_img>0){
        for(let i=0;i<this.exist_prop_images.length;i++){
            if(this.exist_prop_images[i]==exist_img){
               this.exist_prop_images.splice(i, 1);
               this.del_images.push(exist_img); // delete this images
            }
        }
    }
    
    console.log(this.exist_prop_images,'this.exist_prop_images after remove');  
    console.log(this.del_images,'Del Images******************');  
    }     
  }


  removeFileCover(fileIndex:number,exist_img:number) {

    if(confirm('Are you sure to remove this file?')){


    console.log(fileIndex,exist_img,'remove file fileIndex');
    
    this.urls_cover.splice(fileIndex, 1);
    if(this.exist_prop_images.length>0 && exist_img>0){
       for(let i=0;i<this.exist_prop_images.length;i++){
          if(this.exist_prop_images[i]==exist_img){
             this.exist_prop_images.splice(i, 1);
             this.del_images.push(exist_img); // delete this images
          }
          
       }
    }
    
    console.log(this.exist_prop_images,'this.exist_prop_images after remove');
    console.log(this.del_images,'Del Images****************************');  
    }     
  }

chracter_other:any=[];
  onBlurMethod(event){
    console.log(event.target.value,'onBlurMethod event');
    this.chracter_other.push(event.target.value);
    console.log(this.chracter_other,' this.chracter_other');
  }
  
  
public countryDialCodes = [
    {
      "code": "+7 840",
      "name": "Abkhazia"
    },
    {
      "code": "+93",
      "name": "Afghanistan"
    },
    {
      "code": "+355",
      "name": "Albania"
    },
    {
      "code": "+213",
      "name": "Algeria"
    },
    {
      "code": "+1 684",
      "name": "American Samoa"
    },
    {
      "code": "+376",
      "name": "Andorra"
    },
    {
      "code": "+244",
      "name": "Angola"
    },
    {
      "code": "+1 264",
      "name": "Anguilla"
    },
    {
      "code": "+1 268",
      "name": "Antigua and Barbuda"
    },
    {
      "code": "+54",
      "name": "Argentina"
    },
    {
      "code": "+374",
      "name": "Armenia"
    },
    {
      "code": "+297",
      "name": "Aruba"
    },
    {
      "code": "+247",
      "name": "Ascension"
    },
    {
      "code": "+61",
      "name": "Australia"
    },
    {
      "code": "+672",
      "name": "Australian External Territories"
    },
    {
      "code": "+43",
      "name": "Austria"
    },
    {
      "code": "+994",
      "name": "Azerbaijan"
    },
    {
      "code": "+1 242",
      "name": "Bahamas"
    },
    {
      "code": "+973",
      "name": "Bahrain"
    },
    {
      "code": "+880",
      "name": "Bangladesh"
    },
    {
      "code": "+1 246",
      "name": "Barbados"
    },
    {
      "code": "+1 268",
      "name": "Barbuda"
    },
    {
      "code": "+375",
      "name": "Belarus"
    },
    {
      "code": "+32",
      "name": "Belgium"
    },
    {
      "code": "+501",
      "name": "Belize"
    },
    {
      "code": "+229",
      "name": "Benin"
    },
    {
      "code": "+1 441",
      "name": "Bermuda"
    },
    {
      "code": "+975",
      "name": "Bhutan"
    },
    {
      "code": "+591",
      "name": "Bolivia"
    },
    {
      "code": "+387",
      "name": "Bosnia and Herzegovina"
    },
    {
      "code": "+267",
      "name": "Botswana"
    },
    {
      "code": "+55",
      "name": "Brazil"
    },
    {
      "code": "+246",
      "name": "British Indian Ocean Territory"
    },
    {
      "code": "+1 284",
      "name": "British Virgin Islands"
    },
    {
      "code": "+673",
      "name": "Brunei"
    },
    {
      "code": "+359",
      "name": "Bulgaria"
    },
    {
      "code": "+226",
      "name": "Burkina Faso"
    },
    {
      "code": "+257",
      "name": "Burundi"
    },
    {
      "code": "+855",
      "name": "Cambodia"
    },
    {
      "code": "+237",
      "name": "Cameroon"
    },
    {
      "code": "+1",
      "name": "Canada"
    },
    {
      "code": "+238",
      "name": "Cape Verde"
    },
    {
      "code": "+ 345",
      "name": "Cayman Islands"
    },
    {
      "code": "+236",
      "name": "Central African Republic"
    },
    {
      "code": "+235",
      "name": "Chad"
    },
    {
      "code": "+56",
      "name": "Chile"
    },
    {
      "code": "+86",
      "name": "China"
    },
    {
      "code": "+61",
      "name": "Christmas Island"
    },
    {
      "code": "+61",
      "name": "Cocos-Keeling Islands"
    },
    {
      "code": "+57",
      "name": "Colombia"
    },
    {
      "code": "+269",
      "name": "Comoros"
    },
    {
      "code": "+242",
      "name": "Congo"
    },
    {
      "code": "+243",
      "name": "Congo, Dem. Rep. of (Zaire)"
    },
    {
      "code": "+682",
      "name": "Cook Islands"
    },
    {
      "code": "+506",
      "name": "Costa Rica"
    },
    {
      "code": "+385",
      "name": "Croatia"
    },
    {
      "code": "+53",
      "name": "Cuba"
    },
    {
      "code": "+599",
      "name": "Curacao"
    },
    {
      "code": "+537",
      "name": "Cyprus"
    },
    {
      "code": "+420",
      "name": "Czech Republic"
    },
    {
      "code": "+45",
      "name": "Denmark"
    },
    {
      "code": "+246",
      "name": "Diego Garcia"
    },
    {
      "code": "+253",
      "name": "Djibouti"
    },
    {
      "code": "+1 767",
      "name": "Dominica"
    },
    {
      "code": "+1 809",
      "name": "Dominican Republic"
    },
    {
      "code": "+670",
      "name": "East Timor"
    },
    {
      "code": "+56",
      "name": "Easter Island"
    },
    {
      "code": "+593",
      "name": "Ecuador"
    },
    {
      "code": "+20",
      "name": "Egypt"
    },
    {
      "code": "+503",
      "name": "El Salvador"
    },
    {
      "code": "+240",
      "name": "Equatorial Guinea"
    },
    {
      "code": "+291",
      "name": "Eritrea"
    },
    {
      "code": "+372",
      "name": "Estonia"
    },
    {
      "code": "+251",
      "name": "Ethiopia"
    },
    {
      "code": "+500",
      "name": "Falkland Islands"
    },
    {
      "code": "+298",
      "name": "Faroe Islands"
    },
    {
      "code": "+679",
      "name": "Fiji"
    },
    {
      "code": "+358",
      "name": "Finland"
    },
    {
      "code": "+33",
      "name": "France"
    },
    {
      "code": "+596",
      "name": "French Antilles"
    },
    {
      "code": "+594",
      "name": "French Guiana"
    },
    {
      "code": "+689",
      "name": "French Polynesia"
    },
    {
      "code": "+241",
      "name": "Gabon"
    },
    {
      "code": "+220",
      "name": "Gambia"
    },
    {
      "code": "+995",
      "name": "Georgia"
    },
    {
      "code": "+49",
      "name": "Germany"
    },
    {
      "code": "+233",
      "name": "Ghana"
    },
    {
      "code": "+350",
      "name": "Gibraltar"
    },
    {
      "code": "+30",
      "name": "Greece"
    },
    {
      "code": "+299",
      "name": "Greenland"
    },
    {
      "code": "+1 473",
      "name": "Grenada"
    },
    {
      "code": "+590",
      "name": "Guadeloupe"
    },
    {
      "code": "+1 671",
      "name": "Guam"
    },
    {
      "code": "+502",
      "name": "Guatemala"
    },
    {
      "code": "+224",
      "name": "Guinea"
    },
    {
      "code": "+245",
      "name": "Guinea-Bissau"
    },
    {
      "code": "+595",
      "name": "Guyana"
    },
    {
      "code": "+509",
      "name": "Haiti"
    },
    {
      "code": "+504",
      "name": "Honduras"
    },
    {
      "code": "+852",
      "name": "Hong Kong SAR China"
    },
    {
      "code": "+36",
      "name": "Hungary"
    },
    {
      "code": "+354",
      "name": "Iceland"
    },
    {
      "code": "+91",
      "name": "India"
    },
    {
      "code": "+62",
      "name": "Indonesia"
    },
    {
      "code": "+98",
      "name": "Iran"
    },
    {
      "code": "+964",
      "name": "Iraq"
    },
    {
      "code": "+353",
      "name": "Ireland"
    },
    {
      "code": "+972",
      "name": "Israel"
    },
    {
      "code": "+39",
      "name": "Italy"
    },
    {
      "code": "+225",
      "name": "Ivory Coast"
    },
    {
      "code": "+1 876",
      "name": "Jamaica"
    },
    {
      "code": "+81",
      "name": "Japan"
    },
    {
      "code": "+962",
      "name": "Jordan"
    },
    {
      "code": "+7 7",
      "name": "Kazakhstan"
    },
    {
      "code": "+254",
      "name": "Kenya"
    },
    {
      "code": "+686",
      "name": "Kiribati"
    },
    {
      "code": "+965",
      "name": "Kuwait"
    },
    {
      "code": "+996",
      "name": "Kyrgyzstan"
    },
    {
      "code": "+856",
      "name": "Laos"
    },
    {
      "code": "+371",
      "name": "Latvia"
    },
    {
      "code": "+961",
      "name": "Lebanon"
    },
    {
      "code": "+266",
      "name": "Lesotho"
    },
    {
      "code": "+231",
      "name": "Liberia"
    },
    {
      "code": "+218",
      "name": "Libya"
    },
    {
      "code": "+423",
      "name": "Liechtenstein"
    },
    {
      "code": "+370",
      "name": "Lithuania"
    },
    {
      "code": "+352",
      "name": "Luxembourg"
    },
    {
      "code": "+853",
      "name": "Macau SAR China"
    },
    {
      "code": "+389",
      "name": "Macedonia"
    },
    {
      "code": "+261",
      "name": "Madagascar"
    },
    {
      "code": "+265",
      "name": "Malawi"
    },
    {
      "code": "+60",
      "name": "Malaysia"
    },
    {
      "code": "+960",
      "name": "Maldives"
    },
    {
      "code": "+223",
      "name": "Mali"
    },
    {
      "code": "+356",
      "name": "Malta"
    },
    {
      "code": "+692",
      "name": "Marshall Islands"
    },
    {
      "code": "+596",
      "name": "Martinique"
    },
    {
      "code": "+222",
      "name": "Mauritania"
    },
    {
      "code": "+230",
      "name": "Mauritius"
    },
    {
      "code": "+262",
      "name": "Mayotte"
    },
    {
      "code": "+52",
      "name": "Mexico"
    },
    {
      "code": "+691",
      "name": "Micronesia"
    },
    {
      "code": "+1 808",
      "name": "Midway Island"
    },
    {
      "code": "+373",
      "name": "Moldova"
    },
    {
      "code": "+377",
      "name": "Monaco"
    },
    {
      "code": "+976",
      "name": "Mongolia"
    },
    {
      "code": "+382",
      "name": "Montenegro"
    },
    {
      "code": "+1664",
      "name": "Montserrat"
    },
    {
      "code": "+212",
      "name": "Morocco"
    },
    {
      "code": "+95",
      "name": "Myanmar"
    },
    {
      "code": "+264",
      "name": "Namibia"
    },
    {
      "code": "+674",
      "name": "Nauru"
    },
    {
      "code": "+977",
      "name": "Nepal"
    },
    {
      "code": "+31",
      "name": "Netherlands"
    },
    {
      "code": "+599",
      "name": "Netherlands Antilles"
    },
    {
      "code": "+1 869",
      "name": "Nevis"
    },
    {
      "code": "+687",
      "name": "New Caledonia"
    },
    {
      "code": "+64",
      "name": "New Zealand"
    },
    {
      "code": "+505",
      "name": "Nicaragua"
    },
    {
      "code": "+227",
      "name": "Niger"
    },
    {
      "code": "+234",
      "name": "Nigeria"
    },
    {
      "code": "+683",
      "name": "Niue"
    },
    {
      "code": "+672",
      "name": "Norfolk Island"
    },
    {
      "code": "+850",
      "name": "North Korea"
    },
    {
      "code": "+1 670",
      "name": "Northern Mariana Islands"
    },
    {
      "code": "+47",
      "name": "Norway"
    },
    {
      "code": "+968",
      "name": "Oman"
    },
    {
      "code": "+92",
      "name": "Pakistan"
    },
    {
      "code": "+680",
      "name": "Palau"
    },
    {
      "code": "+970",
      "name": "Palestinian Territory"
    },
    {
      "code": "+507",
      "name": "Panama"
    },
    {
      "code": "+675",
      "name": "Papua New Guinea"
    },
    {
      "code": "+595",
      "name": "Paraguay"
    },
    {
      "code": "+51",
      "name": "Peru"
    },
    {
      "code": "+63",
      "name": "Philippines"
    },
    {
      "code": "+48",
      "name": "Poland"
    },
    {
      "code": "+351",
      "name": "Portugal"
    },
    {
      "code": "+1 787",
      "name": "Puerto Rico"
    },
    {
      "code": "+974",
      "name": "Qatar"
    },
    {
      "code": "+262",
      "name": "Reunion"
    },
    {
      "code": "+40",
      "name": "Romania"
    },
    {
      "code": "+7",
      "name": "Russia"
    },
    {
      "code": "+250",
      "name": "Rwanda"
    },
    {
      "code": "+685",
      "name": "Samoa"
    },
    {
      "code": "+378",
      "name": "San Marino"
    },
    {
      "code": "+966",
      "name": "Saudi Arabia"
    },
    {
      "code": "+221",
      "name": "Senegal"
    },
    {
      "code": "+381",
      "name": "Serbia"
    },
    {
      "code": "+248",
      "name": "Seychelles"
    },
    {
      "code": "+232",
      "name": "Sierra Leone"
    },
    {
      "code": "+65",
      "name": "Singapore"
    },
    {
      "code": "+421",
      "name": "Slovakia"
    },
    {
      "code": "+386",
      "name": "Slovenia"
    },
    {
      "code": "+677",
      "name": "Solomon Islands"
    },
    {
      "code": "+27",
      "name": "South Africa"
    },
    {
      "code": "+500",
      "name": "South Georgia and the South Sandwich Islands"
    },
    {
      "code": "+82",
      "name": "South Korea"
    },
    {
      "code": "+34",
      "name": "Spain"
    },
    {
      "code": "+94",
      "name": "Sri Lanka"
    },
    {
      "code": "+249",
      "name": "Sudan"
    },
    {
      "code": "+597",
      "name": "Suriname"
    },
    {
      "code": "+268",
      "name": "Swaziland"
    },
    {
      "code": "+46",
      "name": "Sweden"
    },
    {
      "code": "+41",
      "name": "Switzerland"
    },
    {
      "code": "+963",
      "name": "Syria"
    },
    {
      "code": "+886",
      "name": "Taiwan"
    },
    {
      "code": "+992",
      "name": "Tajikistan"
    },
    {
      "code": "+255",
      "name": "Tanzania"
    },
    {
      "code": "+66",
      "name": "Thailand"
    },
    {
      "code": "+670",
      "name": "Timor Leste"
    },
    {
      "code": "+228",
      "name": "Togo"
    },
    {
      "code": "+690",
      "name": "Tokelau"
    },
    {
      "code": "+676",
      "name": "Tonga"
    },
    {
      "code": "+1 868",
      "name": "Trinidad and Tobago"
    },
    {
      "code": "+216",
      "name": "Tunisia"
    },
    {
      "code": "+90",
      "name": "Turkey"
    },
    {
      "code": "+993",
      "name": "Turkmenistan"
    },
    {
      "code": "+1 649",
      "name": "Turks and Caicos Islands"
    },
    {
      "code": "+688",
      "name": "Tuvalu"
    },
    {
      "code": "+1 340",
      "name": "U.S. Virgin Islands"
    },
    {
      "code": "+256",
      "name": "Uganda"
    },
    {
      "code": "+380",
      "name": "Ukraine"
    },
    {
      "code": "+971",
      "name": "United Arab Emirates"
    },
    {
      "code": "+44",
      "name": "United Kingdom"
    },
    {
      "code": "+1",
      "name": "United States"
    },
    {
      "code": "+598",
      "name": "Uruguay"
    },
    {
      "code": "+998",
      "name": "Uzbekistan"
    },
    {
      "code": "+678",
      "name": "Vanuatu"
    },
    {
      "code": "+58",
      "name": "Venezuela"
    },
    {
      "code": "+84",
      "name": "Vietnam"
    },
    {
      "code": "+1 808",
      "name": "Wake Island"
    },
    {
      "code": "+681",
      "name": "Wallis and Futuna"
    },
    {
      "code": "+967",
      "name": "Yemen"
    },
    {
      "code": "+260",
      "name": "Zambia"
    },
    {
      "code": "+255",
      "name": "Zanzibar"
    },
    {
      "code": "+263",
      "name": "Zimbabwe"
    }
  ]  
  

 
}
