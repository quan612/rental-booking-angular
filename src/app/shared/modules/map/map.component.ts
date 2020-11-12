import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent {
  @Input('location') set location(location: string) {
    this.createMap();
    this.getGeoLocation(location);
  }

  private map: any;
  constructor(private mapService: MapService) {}

  createMap = () => (this.map = this.mapService.createMap());

  private getGeoLocation(location: string): void {
    this.mapService.getGeoPosition(location).subscribe(
      (position) => {
        this.mapService.setCenter(this.map, position);
        this.mapService.addMarker(this.map, position);
      },
      (error: Error) => {
        this.mapService.addPopup(this.map, error);
      }
    );
  }
}
