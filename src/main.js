import $  from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// import { SkyMap } from './skyMapCalls';
import {CelestialCoordinates, AltAzCoordinates, XYCoordinates} from './js/coordinates.js';
// import {plotConstellation} from './testPlot.js';
import {draw} from './js/game.js';
import{Star, Constellation, generateRandomStars, convertConstellations,fovConstellations} from './js/starStuff.js'
const constellations = require('./data/constellations.json');


$(document).ready(function(){

  let convertedConstellation;
  let localConstalltion;

  // $('startGame').onClick(function(){
  //   const centerRA = val();
  //   const centerDec = val();
  //   const fov = 180;
  //   const dispRot = 0;
  //   const canvasWidth = document.getElementById("gameCanvas").width;
  //   const canvasHeight = document.getElementById("gameCanvas").height;
  //   convertConstellations = convertConstellations(constellations.Constellations, centerRA, centerDec,fov,dispRot,canvasWidth,canvasHeight);
  //   localConstalltion = fovConstellations(convertConstellation,screenWidth,screenHeight);
  // });

  const convert = convertConstellations(constellations.Constellations,0.139805556,29.09055556,120,0,800,800);
  draw(fovConstellations(convert,800,800));

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
