import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FileUploadService} from "./shared/services/file-upload.service";
import {AgmInfoWindow} from "@agm/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit {
  @ViewChild('AgmMap') agmMap: any;
  // @ts-ignore
  @ViewChild('wrapper') wrapper: ElementRef;
  public latitude = 49.59913037902855;
  public longitude = 6.133036534410118;
  public zoom = 9;
  private changeLat = this.latitude;
  private changeLng = this.longitude;
  private centerLat = this.latitude;
  private centerLng = this.longitude;
  markers: Array<any> = [];
  previous: any;

  constructor(private renderer: Renderer2, private fileUploadService: FileUploadService) {
  }

  ngOnInit() {
    this.fileUploadService.selectedDataMapSubject.subscribe(res => {
      this.markers = res;
    });
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.onResize();
  }

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.wrapper.nativeElement, 'height',
      (window.innerHeight) + 'px'
    );
  }

  onResize() {
    // resize the container for the google map
    this.renderer.setStyle(
      this.wrapper.nativeElement, 'height',
      (window.innerHeight) + 'px'
    );
    // recenters the map to the resized area.
    this.agmMap.triggerResize().then(() =>
      this.agmMap._mapsWrapper.setCenter({lat: this.latitude, lng: this.longitude}));
  }

  // idle fires after paning or zooming is done.
  // This is where we want to capture the center of the map.
  // This way if the user resizes, the center is preserved.
  idle() {
    this.centerLat = this.changeLat;
    this.centerLng = this.changeLng;
  }

  // this event fires whenever any event changes the center. Panning, zooming, or resizing.
  centerChange(event: any) {
    if (event) {
      this.changeLat = event.lat;
      this.changeLng = event.lng;
    }
  }

  clickedMarker(infowindow: AgmInfoWindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }
}
