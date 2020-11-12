import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import tt from '@tomtom-international/web-sdk-maps';

interface TtResponse {
  summary: object;
  results: { [key: string]: any }[];
}

interface GeoPosition {
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public readonly API_KEY = 'Avx0VgwA88S05o4yoZzTqzMdfrZm9vOh';
  private cachedLocation: { [key: string]: GeoPosition } = {};
  constructor(private http: HttpClient) {}

  getGeoPosition = (location: string): Observable<GeoPosition> => {
    const cached = this.getCachedLocation(location);
    return cached ? of(cached) : this.getPositionFromAPI(location);
  };

  private getPositionFromAPI = (location: string): Observable<GeoPosition> => {
    return this.http
      .get(
        `https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${this.API_KEY}`
      )
      .pipe(
        map((ttResponse: TtResponse) => {
          const { results } = ttResponse;
          if (results && results.length > 0) {
            const { position } = results[0];
            this.doCacheLocation(location, position);
            return position;
          }

          throw this.locationError;
        }),
        catchError((_) => throwError(this.locationError))
      );
  };

  createMap = () => {
    return tt
      .map({
        key: this.API_KEY,
        container: 'map',
        style: 'tomtom://vector/1/basic-main',
        zoom: 16,
      })
      .addControl(new tt.NavigationControl());
  };

  setCenter = (ttMap, position) =>
    ttMap.setCenter(new tt.LngLat(position.lon, position.lat));

  addMarker = (ttMap, position) =>
    new tt.Marker().setLngLat([position.lon, position.lat]).addTo(ttMap);

  addPopup = (ttMap, error) => {
    new tt.Popup({
      className: 'app-popup',
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(new tt.LngLat(0, 0))
      .setHTML(`<p>${error.message}</p>`)
      .addTo(ttMap);
  };

  private getCachedLocation = (location: string): GeoPosition => {
    const locationKey = location.replace(/\s/g, '').toLowerCase();
    return this.cachedLocation[locationKey];
  };

  private doCacheLocation = (location: string, position: GeoPosition) => {
    const locationKey = location.replace(/\s/g, '').toLowerCase();
    this.cachedLocation[locationKey] = position;
  };

  private get locationError(): Error {
    return new Error('Location not found!');
  }
}
