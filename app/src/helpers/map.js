/* eslint-disable */
import leaflet from 'leaflet';

export default function initMap() {
  const mainMap = L.map('map').setView([56.022798299805636, 92.89742899999986], 11);
  L.tileLayer('http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}').addTo(mainMap);
  document.querySelector('.leaflet-control-attribution').remove();

  return mainMap;
}
