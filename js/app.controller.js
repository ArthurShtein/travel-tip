import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
// window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
  locService.getLocationFromStorage();
  mapService
    .initMap()
    .then(() => {
      onGetLocs();
    })
    .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    const elLocs = document.querySelector('.main-table');
    locService.getLocs().then((locs) => {
        var strHTMLs = locs.map((loc) => {
            return `<tr>
          <td>${loc.id}</td>
          <td>${loc.name}</td>
          <td>${loc.lat}</td>
          <td>${loc.lng}</td>
          <td><button data-lat="${loc.lat}" data-lng="${loc.lng}"class="go-btn">Go</button>
          
          <button data-id="${loc.id}" class="delete-btn">Delete</button>
          </td>
          
          </tr>`;
    });

    elLocs.innerHTML = strHTMLs.join('');
    document.querySelectorAll('.go-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        var lat = +e.target.dataset.lat;
        var lng = +e.target.dataset.lng;
        onPanTo(lat, lng);
      });
    });
    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        var locId = +e.target.dataset.id;
        console.log(locId);
        onDeleteLoc(locId);
      });
    });
    locService.putMarkers(locs);
    locService.deleteLoc(locs);
    console.log('Locations:', locs);
    // document.querySelector('.locs').innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo(lat, lng) {
  console.log('Panning the Map');
  mapService.panTo(lat, lng);
}

function onDeleteLoc(locId) {
  locService.deleteLoc(locId);
}


function renderWeather(data) {  
    console.log(data.main)

    elCity = document.querySelector('.city')
    elTemp = document.querySelector('.temp')
    // elWind = document.querySelector('.wind').innerHTML = data.
}