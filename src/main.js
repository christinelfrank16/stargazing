import $  from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// import { SkyMap } from './skyMapCalls';
import {CelestialCoordinates, AltAzCoordinates, XYCoordinates} from './js/coordinates.js';
// import {plotConstellation} from './testPlot.js';
import {draw} from './js/game.js';
import{Star, Constellation, generateRandomStars, convertConstellations,fovConstellations} from './js/starStuff.js'
const testConstellation = require('./data/testConstellation.json');
const testConstellation2 = require('./data/testConstellation2.json');
const constellations = require('./data/constellations.json');


$(document).ready(function(){

  draw();
  // const testCoord1 = new CelestialCoordinates(2.651944444,89.2641667);
  // console.log(testCoord1);
  // const testCoord3 = testCoord1.coverttoXYfromCelestial(2.651944444,89.2641667, 60, 0, 1000);
  // console.log('test3', testCoord3);
  //
  // console.log(testConstellation);
  // plotConstellation(testConstellation,0.139805556,29.09055556,180,0,800,800);
  //
  // testConstellation2.Constellation.forEach(function(constellation){
  //   plotConstellation(constellation,0.139805556,29.09055556,180,0,800,800);
  // });
});
