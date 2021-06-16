import { locService } from './loc.service.js';

export const mapService = {
  initMap,
  addMarker,
  panTo,
  addClickPos,
};

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap');
  return _connectGoogleApi().then(() => {
    console.log('google available');
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    });
    gMap.addListener('click', (mapMouseEvent) => {
      const placeName = prompt('Place name?');
      const pos = JSON.stringify(mapMouseEvent.latLng.toJSON(), null, 2);

      const strPos = JSON.parse(pos);
      console.log(strPos);
      locService.addLocation(placeName, strPos);
      addMarker(strPos);
      //   addMarker(mapMouseEvent.latLng);
      console.log(pos);
    });
  });
}

function addClickPos() {}

function addMarker(loc) {
  console.log(loc);
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hey',
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const D_API = 'AIzaSyDodrdfkHpCuxj0WzWnm4EyjZLsnUGqKRk';
  const A_API = 'AIzaSyAk8bPIGKthlZOKXuegDHTaGrLlIvY_Vs4'; //TODO: Enter your API Key
  var elGoogleApi = document.createElement('script');
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${A_API}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
  });
}
