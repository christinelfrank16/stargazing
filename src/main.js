import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {  SkyMap} from './js/skyMapCalls';
import {  LatLongConverter} from './js/LatLongConverter';
let cities = require('cities');
import {  populateCityDropDown } from './js/cityDropDown';
import {  CelestialCoordinates,  AltAzCoordinates,  XYCoordinates } from './js/coordinates.js';
import {  Star,  Constellation,  generateRandomStars,  convertConstellations,  fovConstellations,
  getClickedPosition } from './js/starStuff.js'
import { displayFound } from './js/displayFound';
const constellations = require('./data/constellations.json');
// audio files
let gamePlayMusicI= require('./audio/constellationGamePlayMusic.m4a');
let soundButtonClickPressI= require('./audio/soundButtonClickPress.wav');
let soundButtonClickReleaseI= require('./audio/soundButtonClickRelease.wav');
let soundButtonDropDownHoverI= require('./audio/soundButtonDropDownHover.wav');
let soundDropDownSoundEffectI= require('./audio/soundDropDownSoundEffect.wav');

$(document).ready(function() {


// audio files
  var gamePlayMusic = new Audio(gamePlayMusicI);
  var soundButtonClickPress = new Audio(soundButtonClickPressI);
  var soundButtonClickRelease = new Audio(soundButtonClickReleaseI);
  var soundButtonDropDownHover = new Audio(soundButtonDropDownHoverI);
  var soundDropDownSoundEffect = new Audio(soundDropDownSoundEffectI);

  let localConstalltion;

  var cvs = document.getElementById("gameCanvas");
  var ctx = cvs.getContext("2d");
  var canvasWidth = document.getElementById("gameCanvas").width;
  var canvasHeight = document.getElementById("gameCanvas").height;
  var difficulty;
  let convert = convertConstellations(constellations.Constellations, 0.139805556, 29.09055556, 120, 0, 800, 800);
  let fovConsts = fovConstellations(convert, 800, 800);

  var randomColorArray = ['#ffedb2', '#fffe9f', '#ffbf87', '#ff9867'];
  var constellationColorArrayMedium = ['#ffedb2', '#fffe9f', '#40E0D0', '#9ee6cf'];
  var constellationColorArrayHard = ['#ffedb2', '#fffe9f', '#ffbf87', '#9ee6cf'];
  var starsArray = generateRandomStars(2000, canvasWidth, canvasHeight, randomColorArray);
  var difficultyStars = difficultyNumberStars(difficulty);

  cvs.addEventListener("click", function(event) {
    console.log(difficultyNumberStars(difficulty));
    getClickedPosition(cvs, event, fovConsts);
    $('#foundConsts').html('');
    displayFound(fovConsts);
    soundButtonClickPress.play();
  });

  //difficulty setting
  $('[aria-labelledby=dropdownMenu1]').click(function(event) {
    event.preventDefault();
    difficulty = event.target.value;
    difficultyStars = difficultyNumberStars(difficulty);
    $('.difficulty .dropdown-toggle').text(event.target.innerHTML);

    draw(fovConsts, starsArray, ctx, difficultyColors(difficulty), randomColorArray, difficultyStars);
    soundDropDownSoundEffect.play();
  });

  //begin button
  $('button[name=startGame]').click(function() {
    gamePlayMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
    gamePlayMusic.play();
    // $('body').append('<audio autoPlay src={gamePlayMusicI}></audio>');
    draw(fovConsts, starsArray, ctx, difficultyColors(difficulty), randomColorArray,difficultyStars);
    $('.intro').hide();
    $('.game').show();
    $('button[name=startGame]').hide();
  });


  let converter = new LatLongConverter(45.5051, -122.6750); // default to portland, OR
  buildDropDown("");

  $('#searchLocation').on('input', function() {
    filterCities($('#searchCities').val().trim().toLowerCase());
  });

  $('#searchLocation').submit(function(event) {
    soundButtonClickRelease.play();
    event.preventDefault();
    const searchValue = $('#searchCities').val();
    buildDropDown(searchValue);
    $('#searchCities').val('');
  });

  $('#cityItems').on('click', '.dropdown-item', function(event) {
    soundButtonDropDownHover.play();
    const cityLatLong = $(this)[0].value;
    const lat = parseFloat(cityLatLong.substring(0, cityLatLong.indexOf(',')));
    const long = parseFloat(cityLatLong.substring(cityLatLong.indexOf(',') + 1));
    converter = new LatLongConverter(lat, long);
    convert = convertConstellations(constellations.Constellations, converter.rightAscention / 15, converter.declination, 120, 0, 800, 800);
    fovConsts = fovConstellations(convert, 800, 800);
    $('.game h1').text('Location: ' + this.innerHTML);
    draw(fovConsts, starsArray, ctx, difficultyColors(difficulty), randomColorArray,difficultyStars);
    $('#citiesDropDown').text($(this)[0].innerHTML);
    $('#citiesDropDown').dropdown('toggle');
  });

  $('#showFoundConsts').click(function(){
    $('#foundConstellations').width('22em');
    $('#foundConsts').html('');
    displayFound(fovConsts);
    if($('.fConst').length > 0){
      $('#noConsts').hide();
      $('#constsFound').show();
    } else {
      $('#noConsts').show();
      $('#constsFound').hide();
    }
  });

  $('#closeFoundConsts').click(function(){
    $('#foundConstellations').width(0);
  });

});



function draw(localConstalltions, starsArray, ctx, constellationColorArray, randomColorArray, difficultyNoS) {
  ctx.clearRect(0, 0, 800, 800);
  //if you need to draw some image (the 0,0 starts top left)
  // ctx.drawImage(imgName,x,y);


  //draw all constellation stars
  localConstalltions.forEach(function(constellation) {
    constellation.stars.forEach(function(star) {
      if (star.clicked) {
        ctx.strokeStyle = '#9ee6cf';
        ctx.beginPath();
        ctx.strokeRect(star.x, star.y, 2, 2);
        ctx.stroke();
      } else {
        ctx.strokeStyle = constellationColorArray[Math.floor(Math.random() * constellationColorArray.length)];
        ctx.beginPath();
        ctx.strokeRect(star.x, star.y, 2, 2);
        ctx.stroke();
      }
    });
  });
  //draw all random stars
  for(let i = 0; i<difficultyNoS; i++){
    let star = starsArray[i];
    ctx.strokeStyle = randomColorArray[Math.floor(Math.random() * randomColorArray.length)];
    ctx.beginPath();
    ctx.strokeRect(star.x, star.y, 2, 2);
    ctx.stroke();
  }

  //code to draw your lines (greyed out), if you click and mouse over 2 points that are correct, then you can have a green line for success
  localConstalltions.forEach(function(constellation) {
    constellation.lines.forEach(function(points) {
      const ids = Object.keys(points);
      const id1 = ids[0];
      const id2 = ids[1];
      let pointsChecked = true;
      for (let i = 0; i < constellation.stars.length; i++) {
        let star = constellation.stars[i];
        if (star.id == id1 || star.id == id2) {
          if (!star.clicked) {
            pointsChecked = false;
          }
        }
      }
      if (pointsChecked) {
        if (constellation.completed) {
          ctx.strokeStyle = "#1fad9f";
          ctx.beginPath();
          ctx.moveTo(points[id1][0], points[id1][1]);
          ctx.lineTo(points[id2][0], points[id2][1]);
          ctx.font = "15px Arial";
          constellationNameAlign(constellation, ctx, 800);
          ctx.fillStyle = "#1fad9f";
          ctx.fillText(constellation.name, constellation.x, constellation.y);
          ctx.stroke();
        } else {
          ctx.strokeStyle = "#C0C0C0";
          ctx.beginPath();
          ctx.moveTo(points[id1][0], points[id1][1]);
          ctx.lineTo(points[id2][0], points[id2][1])
          ctx.stroke();

        }
      }
    });
  });

  window.requestAnimationFrame(function() {
    draw(localConstalltions, starsArray, ctx, constellationColorArray, randomColorArray, difficultyNoS);
  });
}


function buildDropDown(input) {
  let cityList = $('#cityItems');
  cityList.html(populateCityDropDown(input).join(''));
  $('#empty').hide();
}

function filterCities(word) {
  let items = $('.dropdown-item');
  let length = items.length;
  let hidden = 0;

  for (let i = 0; i < length; i++) {
    if ($(items[i])[0].innerHTML.toLowerCase().includes(word)) {
      $(items[i]).show();
    } else {
      $(items[i]).hide();
      hidden++;
    }
  }

  if (hidden === length) {
    $('#empty').show();
  } else {
    $('#empty').hide();
  }
}

function constellationNameAlign(constellation, ctx, screenWidth) {
  if (constellation.x > screenWidth / 2) {
    return ctx.textAlign = 'right';
  }
}

function difficultyColors(difficultyChosen) {
  if (difficultyChosen === "medium") {
    return ['#ffedb2', '#fffe9f', '#40E0D0', '#9ee6cf'];
  } else if (difficultyChosen === "hard") {
    return ['#ffedb2', '#fffe9f', '#ffbf87', '#9ee6cf'];
  } else if (difficultyChosen === "easy") {
    return ['#9ee6cf', '#40E0D0', '#99f0ca', '#c9fdd7'];
  } else {
    return ['#ffedb2', '#fffe9f', '#ffbf87', '#ff9867'];
  }
}

function difficultyNumberStars(difficultyChosen){
  if (difficultyChosen === "medium") {
    return 500;
  } else if (difficultyChosen === "hard") {
    return 1000;
  } else if (difficultyChosen === "easy") {
    return 250;
  } else {
    return 2000;
  }
}
