export class LatLongConverter {
  constructor(lat, long) {
    //latitude
    this.latitude = lat; // degrees
    //longitude
    this.longitude = long; // degrees

    //assume looking straight up in sky
    this.declination = lat; // hours
    
    const julDay = this.convertJulianDay();
    const last = this.calcLAST(julDay, long);

    this.rightAscention = last;
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

    return julianDate;
  }

  // reference: http://www.geoastro.de/elevaz/basics/index.htm
  // reference: https://aa.usno.navy.mil/faq/docs/GAST.php

  calcSideReel(julianDate){ // GMST
    const midnight = Math.floor(julianDate) +0.5;
    const daysSinceMid = julianDate - midnight;
    const hrsSinceMid = daysSinceMid * 24;

    const equinox = 2451545; // JD at vernal equinox
    const wholeDaysSinceEq = midnight - equinox;
    const centuriesSinceEq = (julianDate - equinox)/36525;

    const time = 6.697374558 + (0.06570982441908 * wholeDaysSinceEq)
     + (1.00273790935 * hrsSinceMid)
     + (0.000026 * centuriesSinceEq*centuriesSinceEq);

    return (time%24); // result in hours, reduce to range 0-24
  }

  calcLAST(julianDate, longitude){
    const equinox = 2451545; // JD at vernal equinox
    const daysSinceEq = julianDate - equinox;
    const omega = this.calcLongAscendMoon(daysSinceEq);
    const sunLong = this.calcMeanLongSun(daysSinceEq);
    const nuation = (-0.000319*Math.sin(omega)) - (0.000024*Math.sin(sunLong)); // result in hours
    const obliquity = this.calcObliquity(daysSinceEq);
    const eqEquinoxes = nuation*Math.cos(obliquity);

    const gast = this.calcSideReel(julianDate)+eqEquinoxes; // result in hours

    if(longitude < 0){
      longitude+= 360;
    } else if (longitude > 360){
      longitude -= 360;
    }
    const longInHrs = longitude/15; // 15 deg per hr
    const last = gast + longInHrs;
    return (last%24); // result in hours, reduce to range 0-24
  }

  calcLongAscendMoon(daysSinceEq){
    const omega = 1250.04 - (0.0552954*daysSinceEq);
    return omega; // result in degrees
  }

  calcMeanLongSun(daysSinceEq){
    const sunLong = 280.47 + (0.98565*daysSinceEq);
    return sunLong; // result in degrees
  }

  calcObliquity(daysSinceEq){
    const obliquity = 23.4393 - (0.0000004 * daysSinceEq);
    return obliquity; // result in degrees
  }

}
