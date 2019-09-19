export class CelestialCoordinates {
  constructor(ra, dec) {
    //right ascension
    this.ra = ra;
    //declination
    this.dec = dec;
  }

  coverttoXYfromCelestial(centerRa, centerDec, fov, displayRotation, screenWidth, screenHeight) {
    const altAz = this.convertToAltAz(centerRa, centerDec, fov, displayRotation, screenWidth, screenHeight);
    const xy = altAz.convertToXY(centerRa, centerDec, fov, displayRotation, screenWidth, screenHeight);
    return xy;
  }

  convertToAltAz(centerRa, centerDec, displayFOV, displayROT, screenWidth, screenHeight) {
    //Ra is in hours
    //Dec, fov/angle, displayRotation all degrees
    //displayWidth and displayHeight in pixels
    const HALFPI = 1.5707963267948966192313216916398;
    //rads = pi/180
    const RADS = 0.01745329251994329576923690768489;
    //hours *360/24 = degrees
    const HOURSTODEG = 360 / 24;

    //convert everything to radians
    const ra = this.ra * HOURSTODEG * RADS;
    const dec = this.dec * RADS;
    const fieldRA = centerRa * RADS;
    const fieldDec = centerDec * RADS;


    let alt;
    let az = Math.atan2(Math.sin(fieldRA - ra), Math.cos(fieldRA - ra) * Math.sin(fieldDec) -
      Math.tan(dec) * Math.cos(fieldDec));
    let tmpval = Math.sin(fieldDec) * Math.sin(dec) + Math.cos(fieldDec) * Math.cos(dec) *
      Math.cos(fieldRA - ra);

    if (tmpval >= 1.0) {
      alt = HALFPI;
    } else {
      alt = Math.asin(tmpval);
    }

    let observerCoords = new AltAzCoordinates(alt, az);
    return observerCoords;
  }
}

export class AltAzCoordinates {
  constructor(alt, az) {
    //altitude and azimuth
    this.alt = alt;
    this.az = az;
  }

  convertToXY(centerRA, centerDec, displayFOV, displayROT, screenWidth, screenHeight) {
    const PI = 3.1415926535897932384626433832795;
    const HALFPI = 1.5707963267948966192313216916398;
    const RADS = 0.01745329251994329576923690768489;

    const fieldFOV = displayFOV * RADS;
    const fieldROT = displayROT * RADS;

    const nz = 1.0 - (2.0 * this.alt / PI);
    const az2 = this.az - HALFPI + fieldROT;
    const tx = (nz * Math.cos(az2)) * PI / fieldFOV;
    const ty = -(nz * Math.sin(az2)) * PI / fieldFOV;

    const xyscale = (screenWidth / fieldFOV) / (120.0 / displayFOV);

    const x = Math.floor((screenWidth / 2.0) + (tx * xyscale));
    const y = Math.floor((screenWidth / 2.0) + (ty * xyscale));

    const xyCoordinates = new XYCoordinates(x, y);
    return xyCoordinates;
  }
}

export class XYCoordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
