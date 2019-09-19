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

  var cvs2 = document.getElementById("tutorialCanvas");
  var ctx2 = cvs2.getContext("2d");
  var canvasWidth2 = document.getElementById("tutorialCanvas").width;
  var canvasHeight2 = document.getElementById("tutorialCanvas").height;


  var difficulty;
  let convert = convertConstellations(constellations.Constellations, 0.139805556, 29.09055556, 120, 0, 800, 800);
  let fovConsts = fovConstellations(convert, 800, 800);

  var randomColorArrayTutorial = ['#FF5CFF','#FF7DFF','#FF97FF','#FFACFF'];
  var randomColorArray = ['#ffedb2', '#fffe9f', '#ffbf87', '#ff9867'];
  var constellationTutorialArray = ['#5CFF5C','#7DFF7D','#97FF97','#ACFFAC'];
  var starsArray = generateRandomStars(2000, canvasWidth, canvasHeight, randomColorArray);
  var starsArrayTutorial = generateRandomStars(500, canvasWidth2, canvasHeight2, randomColorArrayTutorial);
  var difficultyStars = difficultyNumberStars(difficulty);

  cvs.addEventListener("click", function(event) {
    getClickedPosition(cvs, event, fovConsts);
    $('#foundConsts').html('');
    displayFound(fovConsts);
    soundButtonClickPress.play()
  });
  cvs2.addEventListener("click", function(event) {
    getClickedPosition(cvs2, event, fovConsts);
  });

  $('button[name=tutorial]').click(function(){
    drawTutorial(fovConsts, starsArrayTutorial, ctx2, constellationTutorialArray, randomColorArrayTutorial);
    $('.intro').hide();
    $('.tutorial').show();
    $('#tutorialCanvas').show();
    $('button[name=tutorial]').hide();
  });
  cvs2.addEventListener("click", function(event) {
    getClickedPosition(cvs2, event, fovConsts);
  });

  $('button[name=tutorial]').click(function(){
    drawTutorial(fovConsts, starsArrayTutorial, ctx2, constellationTutorialArray, randomColorArrayTutorial);
    $('.intro').hide();
    $('.tutorial').show();
    $('#tutorialCanvas').show();
    $('button[name=tutorial]').hide();
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
    event.preventDefault();
    soundButtonClickRelease.play();
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

function drawTutorial(localConstalltions, starsArrayTutorial, ctx2, constellationColorArrayTutorial, randomColorArrayTutorial) {
  ctx2.clearRect(0, 0, 800, 800);

  //draw all constellation stars
  localConstalltions.forEach(function(constellation) {
    constellation.stars.forEach(function(star) {
      ctx2.strokeStyle = constellationColorArrayTutorial[Math.floor(Math.random() * constellationColorArrayTutorial.length)];
        ctx2.beginPath();
        ctx2.strokeRect(star.x, star.y, 2, 2);
        ctx2.stroke();

    });
  });
  //draw all random stars
  starsArrayTutorial.forEach(function(star) {
    ctx2.strokeStyle = randomColorArrayTutorial[Math.floor(Math.random() * randomColorArrayTutorial.length)];
    ctx2.beginPath();
    ctx2.strokeRect(star.x, star.y, 2, 2);
    ctx2.stroke();
  });

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
          ctx2.strokeStyle = "#1fad9f";
          ctx2.beginPath();
          ctx2.moveTo(points[id1][0], points[id1][1]);
          ctx2.lineTo(points[id2][0], points[id2][1]);
          ctx2.font = "15px Arial";
          constellationNameAlign(constellation, ctx2, 800);
          ctx2.fillStyle = "#1fad9f";
          ctx2.fillText(constellation.name, constellation.x, constellation.y);
          ctx2.stroke();
        } else {
          ctx2.strokeStyle = "#C0C0C0";
          ctx2.beginPath();
          ctx2.moveTo(points[id1][0], points[id1][1]);
          ctx2.lineTo(points[id2][0], points[id2][1])
          ctx2.stroke();

        }
      }
    });
  });

  window.requestAnimationFrame(function() {
    drawTutorial(localConstalltions, starsArrayTutorial, ctx2, constellationColorArrayTutorial, randomColorArrayTutorial);
  });
}

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
  //draw all random star
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
