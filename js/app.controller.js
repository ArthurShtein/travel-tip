import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
    locService.getLocationFromStorage()
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));

    locService.getWeather()
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
          <td><button class="go-btn"onclick="onPanTo()">Go</button>
          <button class="delete-btn"onclick="onPanTo()">Delete</button>
          </td>
          
          </tr>`;
        });
        elLocs.innerHTML = strHTMLs.join('');

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
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}


function renderWeather(data) {  
    console.log(data.main)

    elCity = document.querySelector('.city')
    elTemp = document.querySelector('.temp')
    // elWind = document.querySelector('.wind').innerHTML = data.
}