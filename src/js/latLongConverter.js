export class latLongConverter {
  constructor(lat, long) {
    //latitude
    this.latitude = lat;
    //longitude
    this.longitude = long;

    //assume looking straight up in sky
    this.declination = lat;

    const julDay = convertJulianDay();
    const theta = calcSideReel(julDay, long);
    const tau = calcTau(latitude);

    this.rightAscention = calcRa(tau, theta);
  }

  convertJulianDay(){
    // reference: https://en.wikipedia.org/wiki/Julian_day#Julian_date_calculation
    const nowDate = new Date();

    const date = nowDate.getDate();
    const month = nowDate.getMonth();
    const year = nowDate.getFullYear();
    const hour = nowDate.getUTCHours();
    const min = nowDate.getUTCMinutes();
    const sec = nowDate.getUTCSeconds();

    const julianDayNum = (1461 × (year + 4800 + (month− 14)/12))/4 +(367 × (month − 2 − 12 × ((month − 14)/12)))/12 − (3 × ((year + 4900 + (month - 14)/12)/100))/4 + day − 32075;

    if(hour < 12){
      julianDayNum + 1;
    }
    const julianDate = julianDayNum + ((hour-12)/24) + (min/1440) + (sec/86400);


    return julianDate;
  }

  // reference: http://www.geoastro.de/elevaz/basics/index.htm

  calcSideReel(julianDate, longitude){
    const equinox = 2451545 // JD at vernal equinox
    const centuriesSinceEq = (julianDate - equinox)/36525;
    const time = 280.46061837 + 360.98564736629*(julianDate-2451545.0) + 0.000387933*(centuriesSinceEq^2) - (centuriesSinceEq^3)/38710000.0;

    return time + longitude;
  }
  // hour angle
  // corresponds to the length of sidereal time elapsed since the body St last made a transit of the meridian
  // assume delta declination = 0 (no rotation from celestial equator)
  // assume altitude = 90 (straight up)
  calcTau(latitude){
    return Math.acos(1/Math.cos(latitude));
  }

  calcRa(tau, theta){
    return theta - tau;
  }
}
