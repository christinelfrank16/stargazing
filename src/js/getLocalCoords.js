import $ from 'jquery';
export function getLocal(local){
  return new Promise((resolve,reject) => {
    // $.getJSON('https://json.geoiplookup.io/api?callback=?', function(data) {
    $.getJSON('https://json.geoiplookup.io/', function(data) {
      resolve(data);
    });
  });
}
