export class LatLongConverter {
  constructor(lat, long) {
    //latitude
    this.latitude = lat;
    //longitude
    this.longitude = long;

    //assume looking straight up in sky
    this.declination = lat;
    debugger
    const julDay = this.convertJulianDay();
    const theta = this.calcSideReel(julDay, long);
    const tau = this.calcTau(lat);

    this.rightAscention = this.calcRa(tau, theta);
  }

  convertJulianDay(){
    // reference: https://en.wikipedia.org/wiki/Julian_day#Julian_date_calculation
    const nowDate = new Date();

    const date = nowDate.getDate();
    const month = nowDate.getMonth()+1; // base 0 for January
    const year = nowDate.getFullYear();
    const hour = nowDate.getUTCHours();
    const min = nowDate.getUTCMinutes();
    const sec = nowDate.getUTCSeconds();

    let julianDayNum = (367*year) - Math.floor(7*(year + Math.floor((month+9)/12))/4)+Math.floor(275*month/9) + date + 1721013.5;

    const julianDate = julianDayNum + (hour/24) + (min/1440) + (sec/86400);

    return [julianDate, hour];
  }

  // reference: http://www.geoastro.de/elevaz/basics/index.htm

  calcSideReel(julianDateArray, longitude){
    const julianDate = julianDateArray[0];
    const utcHour = julianDateArray[1];
    const midnight = Math.floor(julianDate) +0.5;
    const daysSinceMid = julianDate - midnight;
    const hrsSinceMid = daysSinceMid * 24;

    const equinox = 2451545 // JD at vernal equinox
    const wholeDaysSinceEq = midnight - equinox;
    const centuriesSinceEq = (julianDate - equinox)/36525;

    const time = 6.697374558 + (0.06570982441908 * wholeDaysSinceEq)
     + (1.00273790935 * hrsSinceMid)
     + (0.000026 * centuriesSinceEq*centuriesSinceEq);

     if(longitude < 0){
       longitude += 360;
     } else if (longitude > 360){
       longitude -= 360;
     }

    return ((time%24)*15 + longitude) % 360; // convert to degrees then add local location
  }

  calcEclipLong(julianDateArray){
    const equinox = 2451545;
    const julianDate = julianDateArray[0];
    const julianCenturiesSinceEq = (julianDate-equinox)/36525;

    const eps = 23.0 + (26.0/60.0) + (21.448/3600.0) - (46.8150*julianCenturiesSinceEq + 0.00059*julianCenturiesSinceEq*julianCenturiesSinceEq - 0.001813*julianCenturiesSinceEq*julianCenturiesSinceEq*julianCenturiesSinceEq)/3600;

  }
  // hour angle
  // corresponds to the length of sidereal time elapsed since the body St last made a transit of the meridian
  // assume delta declination = 0 (no rotation from celestial equator)
  // assume altitude = 90 (straight up)
  calcTau(latitude, longitude){
    (1-Math.sin(latitude)*Math.sin(90))/(Math.cos(latitude))
    // return Math.acos(1/Math.cos(latitude));
  }

  calcRa(tau, theta){
    return theta - tau;
  }
}
