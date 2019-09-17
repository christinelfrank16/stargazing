import $  from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { SkyMap } from './skyMapApi';
import {CelestialCoordinates, AltAzCoordinates, XYCoordinates} from './coordinates.js';
import {plotConstellation} from './testPlot.js';
const testConstellation = require('./data/testConstellation.json');

$(document).ready(function(){
  const testCoord1 = new CelestialCoordinates(2.651944444,89.2641667);
  console.log(testCoord1);
  const testCoord3 = testCoord1.coverttoXYfromCelestial(2.651944444,89.2641667, 60, 0, 1000);
  console.log('test3', testCoord3);

  console.log(testConstellation);
  plotConstellation(testConstellation,0.139805556,29.09055556,180,0,800,800);
});


// $(document).ready(function() {
//   $('#submit').click(function() {
//     // const symptoms = $("#userSymptoms").val();
//     // const state = $("#userState").val();
//     // let providerInfo=[];
//
// //
//     let constellationInfo = new SkyMap();
//     let promise = results.getConstInfo();  // call the instance method and pass in user input
//
// //
//     promise.then(function(response) {
//       const body = JSON.parse(response);
//       console.log(body);
//forech loop targeting the body.practices
        // $("#location").append(`<div id=q${i} class="question col-md-4">
        //  <h4 class="category">${body.results[i].category}</h4>


        // $('.constellationInfo').html( `${}`);
//         // $('.showErrors').text(`There was an error processing your request: ${error.message}`);
//     })
//   });
// });
