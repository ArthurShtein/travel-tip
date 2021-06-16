export const locService = {
  getLocs,
  getLocationFromStorage,
  addLocation,
  putMarkers,
  deleteLoc,
  getWeather
};

import { mapService } from './map.service.js';
import { storageService } from './storage-service.js';
const KEY = 'locsDB';
var gLocs;
var gId = 101;

function getLocationFromStorage() {
    var locs = storageService.load(KEY) || [];

    if (!locs.length) {
        gLocs = [
            { id: ++gId, name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
            { id: ++gId, name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
        ];
    } else {
        gLocs = locs;
    }
}
function putMarkers(locs) {
  console.log(locs);
  const markers = locs.map((loc) => {
    return { lat: loc.lat, lng: loc.lng };
  });
  markers.forEach((markerLoc) => {
    mapService.addMarker(markerLoc);
  });
}

function addLocation(name, { lat, lng }) {
  var lastObjectIdx = gLocs.length -1
  if ((gLocs[lastObjectIdx].id + 1) > gId) {
      gId = gLocs[lastObjectIdx].id
  }

  gLocs.push({ id: ++gId, name, lat, lng });
  storageService.save(KEY, gLocs);

}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 0);
    });
}


function getWeather() {
    console.log(gLocs[0].lat); 
    console.log(gLocs[0].lng); 
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${gLocs[0].lat}&lon=${gLocs[0].lng}&APPID=331aa82c2da54fbb8879d4d937efa80e`)
        .then((res) => {
            console.log(res.data)
            renderWeather(res.data)
        })
}



function deleteLoc(locId) {
  console.log('Deleting: ', locId);
  var locIdx = gLocs.findIndex((loc) => {
    return locId === loc.id;
  });
  if (locIdx === -1) return;
  gLocs.splice(locIdx, 1);
  storageService.save(KEY, gLocs);
}
