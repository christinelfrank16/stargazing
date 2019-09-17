import {
  CelestialCoordinates,
  XYCoordinates
} from './coordinates.js';

function createCoordinate(constellationObj, centerRa, centerDec, fov, displayRotation, screenWidth, screenHeight) {
  constellationObj.stars.forEach(function(star) {
    star['celestial'] = new CelestialCoordinates(star.RAh, star.DEd);
    star['xy'] = star.celestial.coverttoXYfromCelestial(centerRa, centerDec, fov, displayRotation, screenWidth, screenHeight);
  });
  return constellationObj;
}

export function plotConstellation(constellationObj, centerRa, centerDec, fov, displayRotation, screenWidth, screenHeight) {
  const coordinateObj = createCoordinate(constellationObj, centerRa, centerDec, fov, displayRotation, screenWidth, screenHeight);

  coordinateObj.stars.forEach(function(star) {
    console.log(star.starName);
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#faef8e";
    ctx.beginPath();
    ctx.strokeRect(star.xy.x, star.xy.y, 5,5);
    ctx.stroke();
  });
  return true;
}
