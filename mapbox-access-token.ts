import * as mapboxgl from 'mapbox-gl';

export function setMapboxAccessToken(token: string) {
  (mapboxgl as any).accessToken = token;
}
