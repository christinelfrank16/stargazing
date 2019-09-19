import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {
  SkyMap
} from './js/skyMapCalls';
import {
  LatLongConverter
} from './js/LatLongConverter';
let cities = require('cities');
import {
  populateCityDropDown
} from './js/cityDropDown';
import {
  CelestialCoordinates,
  AltAzCoordinates,
  XYCoordinates
} from './js/coordinates.js';
import {
  Star,
  Constellation,
  generateRandomStars,
  convertConstellations,
  fovConstellations,
  getClickedPosition
} from './js/starStuff.js'
const constellations = require('./data/constellations.json');

$(document).ready(function() {

  let convertedConstellation;
  let localConstalltion;

  var cvs = document.getElementById("gameCanvas");
  var ctx = cvs.getContext("2d");
  var canvasWidth = document.getElementById("gameCanvas").width;
  var canvasHeight = document.getElementById("gameCanvas").height;
  const convert = convertConstellations(constellations.Constellations, 0.139805556, 29.09055556, 120, 0, 800, 800);
  let fovConsts = fovConstellations(convert, 800, 800);
  console.log(fovConsts);

  var randomColorArray = ['#ffedb2', '#fffe9f', '#ffbf87', '#ff9867'];
  var constellationColorArray = ['#ffedb2', '#fffe9f', '#ffbf87', '#9ee6cf'];
  var starsArray = generateRandomStars(500, canvasWidth, canvasHeight, randomColorArray);

  cvs.addEventListener("click", function(event) {
    getClickedPosition(cvs, event, fovConsts);
    // draw(fovConsts, starsArray, ctx);
  });

  let converter = new LatLongConverter(45.5051, -122.6750); // default to portland, OR
  buildDropDown("");


  draw(fovConsts, starsArray, ctx, constellationColorArray, randomColorArray);

  $('#searchLocation').on('input', function() {
    filterCities($('#searchCities').val().trim().toLowerCase());
  });

  $('#searchLocation').submit(function(event) {
    event.preventDefault();
    const searchValue = $('#searchCities').val();
    buildDropDown(searchValue);
    $('#searchCities').val('');
  });

  $('#cityItems').on('click', '.dropdown-item', function() {
    const cityLatLong = $(this)[0].value;
    const lat = parseFloat(cityLatLong.substring(0, cityLatLong.indexOf(',')));
    const long = parseFloat(cityLatLong.substring(cityLatLong.indexOf(',') + 1));
    converter = new LatLongConverter(lat, long);
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


function draw(localConstalltions, starsArray, ctx, constellationColorArray, randomColorArray) {
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
  starsArray.forEach(function(star) {
    ctx.strokeStyle = randomColorArray[Math.floor(Math.random() * randomColorArray.length)];
    ctx.beginPath();
    ctx.strokeRect(star.x, star.y, 2, 2);
    ctx.stroke();
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
          ctx.strokeStyle = "#1fad9f";
          ctx.beginPath();
          ctx.moveTo(points[id1][0], points[id1][1]);
          ctx.lineTo(points[id2][0], points[id2][1]);
          ctx.font = "30px Arial";
          ctx.fillStyle="#1fad9f";
          ctx.fillText(constellation.name, constellation.x, constellation.y);
          ctx.stroke();
        } else {
          ctx.strokeStyle = "#ff0000";
          ctx.beginPath();
          ctx.moveTo(points[id1][0], points[id1][1]);
          ctx.lineTo(points[id2][0], points[id2][1])
          ctx.stroke();

        }
      }
    });
  });

  window.requestAnimationFrame(function() {
    draw(localConstalltions, starsArray, ctx, constellationColorArray, randomColorArray);
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
  let collection = [];
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
