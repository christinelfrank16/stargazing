import {
  CelestialCoordinates
} from './coordinates.js';

export class Star {
  constructor(name, constellation, ra, dec, ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight) {
    this.name = name;
    this.constellation = constellation;
    this.celestial = new CelestialCoordinates(ra, dec);
    this.xy = this.celestial.coverttoXYfromCelestial(ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight);
    this.clicked = false;
  }
}

export class Constellation {
  constructor(name, ra, dec,ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight) {
    this.name = name;
    this.stars = [];
    this.ra = ra;
    this.dec = dec;
    this.cellestial = new CelestialCoordinates(ra, dec);
    this.x = this.cellestial.coverttoXYfromCelestial(ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight).x;
    this.y = this.cellestial.coverttoXYfromCelestial(ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight).y;
  }
}

export function generateRandomStars(length, screenWidth, screenHeight, colorArray) {
  let starArray = [];
  for (let i = 0; i < length; i++) {
    let star = {
      x: Math.floor(Math.random() * (screenWidth + 1)),
      y: Math.floor(Math.random() * (screenHeight + 1)),
      twinkle: Math.floor(Math.random() * colorArray.length)
    }
    starArray.push(star);
  }
  return starArray;
}


export function convertConstellations(constellationObjs, ra, dec, ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight) {
  let convertedConstellations = [];
  //loops through all constellations
  constellationObjs.forEach(function(constellation) {
    let constObj = new Constellation(constellation.Name, constellation.RAh, constellation.DEd);
    constellation.stars.forEach(function(star) {
      let starObj = new Star(star.Name, constellation.Name, star.RAh, star.DEd, ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight);
      constObj.stars.push(starObj);
    });
    convertedConstellations.push(constObj);
  });
  return convertedConstellations;
}

export function fovConstellations(convertedConstellations, screenWidth, screenHeight) {
  let checkedConstellations = [];
  convertConstellations.forEach(function(constellation) {
    let check = true;
    if (constellation.x < 0 || constellation.x > screenWidth || constellation.y < 0 || constellation.y > screenHeight) {
      check = false;
    }
    constellation.forEach(function(star) {
      if (star.xy.x < 0 || star.xy.x > screenWidth || star.xy.y < 0 || star.xy.y > screenHeight) {
        check = false;
      }
    });

    if (check) {
      checkedConstellations.push(constellation);
    }
  });
  return checkedConstellations;
}
