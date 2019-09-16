export class CelestialCoordinates {
  constructor(ra, dec) {
    //right ascension
    this.ra = ra;
    //declination
    this.dec = dec;
  }

  coverttoXYfromCelestial(ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight){
    const altAz = this.convertToAltAz(ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight);
    const xy = altAz.convertToXY(ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight);
    return xy;
  }

  convertToAltAz(ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight) {
    //Ra is in hours
    //Dec, fov/angle, displayRotation all degrees
    //displayWidth and displayHeight in pixels
    const PI = 3.1415926535897932384626433832795;
    const TWOPI = 6.283185307179586476925286766559;
    const HALFPI = 1.5707963267948966192313216916398;
    //rads = pi/180
    const RADS = 0.01745329251994329576923690768489;
    //hours *360/24 = degrees
    const HOURSTODEG= 360/24;

    //convert everything to radians
    let ra = this.ra * RADS;
    let dec = this.dec * RADS;
    centerRA = centerRA * RADS;
    centerDec = centerDec * RADS;
    fov = fov * RADS;
    displayRotation = displayRotation * RADS;

    let alt;
    let az = Math.Atan2(Math.Sin(ceterRa - RA), Math.Cos(ceterRa - RA) * Math.Sin(centerDec) -
      Math.Tan(Dec) * Math.Cos(centerDec));
    let tmpval = Math.Sin(centerDec) * Math.Sin(Dec) + Math.Cos(centerDec) * Math.Cos(Dec) *
      Math.Cos(ceterRa - RA);

    if (tmpval >= 1.0) {
      alt = HALFPI;
    } else {
      alt = Math.Asin(tmpval);
    }

    let observerCoords = new AltAzCoordinates(az, alt);
    return observerCoords;
  }
}

export class AltAzCoordinates {
  constructor(alt, az) {
    //altitude and azimuth
    this.alt = alt;
    this.az = az;
  }

  convertToXY(ceterRa, centerDec, fov, displayRotation, screenWidth, screenHeight){
    const TWOPI = 6.283185307179586476925286766559;
    const HALFPI = 1.5707963267948966192313216916398;

    const nz = 1.0 - 2.0 * this.alt / PI;
    const az2 = this.az - HALFPI + displayRotation;
    const tx = (nz * Math.Cos(az2)) * PI / fov;
    const ty = -(nz * Math.Sin(az2)) * PI / fov;

    const xyscale = (float(screenWidth) / fieldFOV) / (120.0 / displayFOV);

    const x = int((float(screenWidth) / 2.0) + (tx * xyscale));
    const y = int((float(screenWidth) / 2.0) + (ty * xyscale));

    const xyCoordinates = new xyCoordinates(x,y);
    return xyCoordinates;
  }
}

export class XYCoordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
