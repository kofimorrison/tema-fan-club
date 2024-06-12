import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { setMapboxAccessToken } from '../../../mapbox-access-token';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // Initialize the map
    const map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [9.129513, 48.900718],
      zoom: 15,

    });

    new mapboxgl.Marker()
      .setLngLat([9.129513, 48.900718])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Rosenstolz Immobilien</h3><p>Oskar-Schlemmer-str. 14, 71679 Asperg</p>"))
      .addTo(map).togglePopup();
  }
}
