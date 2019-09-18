import {
  CelestialCoordinates
} from './coordinates.js';

export class Star {
  constructor(id, name, constellation, ra, dec, ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight) {
    this.id = id;
    this.name = name;
    this.constellation = constellation;
    this.celestial = new CelestialCoordinates(ra, dec);
    this.xy = this.celestial.coverttoXYfromCelestial(ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight);
    this.x = this.xy.x;
    this.y = this.xy.y;
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
    this.xy = this.cellestial.coverttoXYfromCelestial(ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight);
    this.x = this.xy.x;
    this.y = this.xy.y;
    this.completed = false;
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


export function convertConstellations(constellationObjs, ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight) {
  let convertedConstellations = [];

  constellationObjs.forEach(function(constellation) {
    let constObj = new Constellation(constellation.Name, constellation.RAh, constellation.DEd,ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight);

    constellation.stars.forEach(function(star) {
      let starObj = new Star(star.id, star.starName, constellation.Name, star.RAh, star.DEd, ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight);
      constObj.stars.push(starObj);
    });

    let points = [];
    constellation.lines.forEach(function(linePoints){
      let lineObj = {};
      for(let i = 0; i < constellation.stars.length; i++){
        let star = constObj.stars[i];
        if(linePoints[0] == star.id){
          lineObj[star.id] = [star.x, star.y];
        } else if (linePoints[1] == star.id){
          lineObj[star.id] = [star.x, star.y];
        }
        if(Object.keys(lineObj).length === 2){
          points.push(lineObj);
          break;
        }
      }
    });
    constObj.lines = points;

    convertedConstellations.push(constObj);
  });
  return convertedConstellations;
}

export function fovConstellations(convertedConstellations, screenWidth, screenHeight) {
  let checkedConstellations = [];
  convertedConstellations.forEach(function(constellation) {
    let check = true;
    if (constellation.x < 0 || constellation.x > screenWidth || constellation.y < 0 || constellation.y > screenHeight) {
      check = false;
    }
    constellation.stars.forEach(function(star) {
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


export function getClickedPosition(cvs, event, fovConsts) {
  let border = cvs.getBoundingClientRect();
  let cordX = event.clientX - border.left;
  let cordY = event.clientY - border.top;

  fovConsts.forEach(function(constellation){
    if(constellation.completed === false){
      // console.log("const not completed");
      constellation.stars.forEach(function(star){
        // console.log(star.name, Math.abs(star.x - cordX), Math.abs(star.y - cordY));
        // console.log("star coords", star.x, star.y);
        console.log("click coords", cordX,cordY);

        if((Math.abs(star.x - cordX) < 10) && (Math.abs(star.y - cordY) < 10)){
          console.log("clicked star!", star.name);
          star.clicked = true;
        }
      });
      let constComplete = true;
      constellation.stars.forEach(function(star){
        if(!star.clicked){
          constComplete = false;
        }
      });

      constellation.complete = constComplete;
    }
  });



}

// export function gameWon(){
//   let allCorrect = localConstalltion;
//     if(allCorrect === correctStar);{
//       return true;
//     } else{
//       return false;
//     }
//
// }
