export const locService = {
  getLocs,
  getLocationFromStorage,
  addLocation,
};

import { storageService } from './storage-service.js';
const KEY = 'locsDB';
var gLocs;
var gId = 101;

function getLocationFromStorage() {
  var locs = storageService.load(KEY) || [];

  if (!locs.length) {
    gLocs = [
      { id: gId++, name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
      { id: gId++, name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
    ];
  } else {
    gLocs = locs;
  }
}

function addLocation(name, { lat, lng }) {
  gLocs.push({ id: gId++, name, lat: lat.toFixed(5), lng: lng.toFixed(5) });
  storageService.save(KEY, gLocs);
}

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(gLocs);
    }, 2000);
  });
}
