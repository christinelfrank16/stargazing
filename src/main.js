import $  from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { SkyMap } from './skyMapCalls';
import { LatLongConverter } from './js/LatLongConverter';
import {ConstellationDetails} from './Constellationinfo';
let cities = require('cities');
import { populateCityDropDown } from './js/cityDropDown';
import {CelestialCoordinates, AltAzCoordinates, XYCoordinates} from './js/coordinates.js';
import {draw} from './js/game.js';
import{Star, Constellation, generateRandomStars, convertConstellations,fovConstellations} from './js/starStuff.js'
const constellations = require('./data/constellations.json');

 $(document).ready(function() {

   let convertedConstellation;
   let localConstalltion;

   let converter = new LatLongConverter(45.5051, -122.6750); // default to portland, OR
   buildDropDown("");

   const convert = convertConstellations(constellations.Constellations,0.139805556,29.09055556,120,0,800,800);
   draw(fovConstellations(convert,800,800));

   $('.nav-link[name=constellations]').click(function() {
      let constellationWiki = new ConstellationDetails();
      console.log(constellationWiki);
      $("#toShow").showConstellations();

  });

  $('#searchLocation').on('input', function(){
    filterCities($('#searchCities').val().trim().toLowerCase());
  });

  $('#searchLocation').submit(function(event){
    event.preventDefault();
    const searchValue = $('#searchCities').val();
    buildDropDown(searchValue);
    $('#searchCities').val('');
  });

  $('#cityItems').on('click', '.dropdown-item', function(){
    const cityLatLong = $(this)[0].value;
    const lat = parseFloat(cityLatLong.substring(0, cityLatLong.indexOf(',')));
    const long = parseFloat(cityLatLong.substring(cityLatLong.indexOf(',')+1));
    converter = new LatLongConverter(lat, long);
    console.log(converter);
    $('#citiesDropDown').text($(this)[0].innerHTML);
    $('#citiesDropDown').dropdown('toggle');
  });

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


function buildDropDown(input){
  let cityList = $('#cityItems');
  cityList.html(populateCityDropDown(input).join(''));
  $('#empty').hide();
}

function filterCities(word){
  let items = $('.dropdown-item');
  let length = items.length;
  let collection = [];
  let hidden = 0;

  for(let i=0; i< length; i++){
    if($(items[i])[0].innerHTML.toLowerCase().includes(word)){
      $(items[i]).show();
    } else {
      $(items[i]).hide();
      hidden++;
    }
  }

  if(hidden === length){
    $('#empty').show();
  } else {
    $('#empty').hide();
  }
}
