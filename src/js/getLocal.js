import $ from 'jquery';
export class Local {
  constructor(){
    this.buildLocal();
  }

  buildLocal(){
    let localCoordsPromise = getLocalCoords();
    let localTimePromise = getLocalTime();
    Promise.all([localCoordsPromise, localTimePromise]).then(function(responses){
      const coordsResp = responses[0];
      const timeResp = responses[1];
      if(coordsResp && timeResp){
        this.latitude = coordsResp.latitude;
        this.longitude = coordsResp.longitude;
        this.timezone = timeResp.timezone;
        this.time = new Date(timeResp.datetime);
      }
    });
  }
}


function getLocalCoords(){
  return new Promise((resolve,reject) => {
    // $.getJSON('https://json.geoiplookup.io/api?callback=?', function(data) {
    $.getJSON('https://json.geoiplookup.io/', function(data) {
      resolve(data);
    });
  });
}

function getLocalTime(){
  return new Promise((resolve,reject) => {
    // $.getJSON('https://json.geoiplookup.io/api?callback=?', function(data) {
    $.getJSON('http://worldtimeapi.org/api/ip/', function(data) {
      resolve(data);
    });
  });
}
