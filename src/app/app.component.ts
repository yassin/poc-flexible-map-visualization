import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {FileUploadService} from "./shared/services/file-upload.service";
import {AgmInfoWindow, GoogleMapsAPIWrapper} from "@agm/core";
  import LatLngBounds = google.maps.LatLngBounds;

  @Component({
    selector: 'app-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
  })

  export class AppComponent implements OnInit {
    @ViewChild('AgmMap') agmMap: any;
    // @ts-ignore
    @ViewChild('wrapper') wrapper: ElementRef;
    public latitude = 49.59913037902855;
    public longitude = 6.133036534410118;
    public zoom = 13;
    public changeLat = this.latitude;
    public changeLng = this.longitude;
    private centerLat = this.latitude;
    private centerLng = this.longitude;
    markers: Array<any> = [];
    previous: any;
    currentResult: any[] = [];
    showMarkers: boolean = false;


    constructor(private renderer: Renderer2, private fileUploadService: FileUploadService, private zone: NgZone, private googleMapsAPIWrapper: GoogleMapsAPIWrapper) {
    }

    ngOnInit() {
      this.zone.runOutsideAngular(() => {
        this.fileUploadService.selectedDataMapSubject.subscribe(res => {
          this.currentResult = res;
        });
      });
    }

    @HostListener('window:resize')
    onWindowResize() {
      this.onResize();
    }

    ngAfterViewInit() {
      this.zone.runOutsideAngular(() => {
        this.renderer.setStyle(
          this.wrapper.nativeElement, 'height',
          (window.innerHeight) + 'px'
        );
      });

    }

    onResize() {
      this.zone.runOutsideAngular(() => {
        // resize the container for the google map
        this.renderer.setStyle(
          this.wrapper.nativeElement, 'height',
          (window.innerHeight) + 'px'
        );
        // recenters the map to the resized area.
        this.agmMap.triggerResize().then(() =>
          this.agmMap._mapsWrapper.setCenter({lat: this.latitude, lng: this.longitude}));
      });
    }


  // idle fires after paning or zooming is done.
  // This is where we want to capture the center of the map.
  // This way if the user resizes, the center is preserved.
    idle() {
      this.zone.runOutsideAngular(() => {
        this.centerLat = this.changeLat;
        this.centerLng = this.changeLng;
      });
    }


  // this event fires whenever any event changes the center. Panning, zooming, or resizing.
    centerChange(event: any) {
      this.zone.runOutsideAngular(() => {
        if (event) {
          this.changeLat = event.lat;
          this.changeLng = event.lng;
        }
      });

    }


    clickedMarker(infowindow: AgmInfoWindow) {
      this.zone.runOutsideAngular(() => {
        if (this.previous) {
          this.previous.close();
        }
        this.previous = infowindow;
      });
    }


    updateMarkers(newBounds: LatLngBounds) {
      this.zone.runOutsideAngular(() => {
        this.showMarkers = false;
        this.markers = this.currentResult.filter(marker => newBounds.contains(marker));
        console.log(this.markers);
        this.showMarkers = true;
      });
    }
  }
