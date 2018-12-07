import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';
import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral} from '@agm/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-property-listing',
  templateUrl: './city-property-listing.component.html',
  styleUrls: ['./city-property-listing.component.css']
})
export class CityPropertyListingComponent implements OnInit {
    @ViewChild('AgmMap') agmMap: AgmMap;  
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
    
    markers: marker[];
    
    /*markers: marker[] = [
            {
                    latitude: 51.673858,
                    longitude: 7.815982,
                    label: 'A',
                    draggable: true
            },
            {
                    latitude: 51.373858,
                    longitude: 7.215982,
                    label: 'B',
                    draggable: false
            },
            {
                    latitude: 51.723858,
                    longitude: 7.895982,
                    label: 'C',
                    draggable: true
            }
    ]   */
  
    public properties=[];
    public id: string;
    public settingsData:any;
    constructor(private commonService: CommonServiceService, private route: ActivatedRoute ) { 
        //this.route.params.subscribe(params => { this.id = params['slug']; });
        this.commonService.showLoader();
    }
    
    getCityProperties(id:string){
        this.commonService.post('getCityProperties',id).subscribe((res)=>{
            let Jres=JSON.parse(res._body);
            console.log(Jres,' after parse all properties');
            this.properties=Jres.data;
            this.markers=Jres.data;
            console.log(this.markers,' after parse all markers');
            this.commonService.hideLoader();
        });
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('slug');
        this.commonService.getData().subscribe((res)=>{
            this.settingsData=res.data;
            console.log(this.settingsData,' after parse all properties settingsData');
        });
        this.getCityProperties(this.id);
    }
  
}

interface marker {
    latitude: number;
    longitude: number;
    label?: string;
    draggable: boolean;
}
