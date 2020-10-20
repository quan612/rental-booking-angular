import { Component, Input, ViewEncapsulation } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent {
  @Input('location') set location(location: string) {
    this.createMap();
  }
  constructor() {}

  createMap = () => {
    const map = tt.map({
      key: 'Avx0VgwA88S05o4yoZzTqzMdfrZm9vOh',
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
    });
    map.addControl(new tt.NavigationControl());
  };
}
