let cities = require('cities');


export function populateCityDropDown(userInput){
  let cityObjs = [];
  const zipRegex = /[0-9]{5}/;
  if(zipRegex.test(userInput)){
    cityObjs.push(cities.zip_lookup(userInput));
  } else if(userInput === ""){
    cityObjs = cities.findByState('OR');
  } else {
    cityObjs = cities.findByState(userInput);
  }
  let btnList = cityObjs.map(function(city){
    return buildDropDownBtn(city);
  });
  btnList = buildForeignCities(btnList).concat(['<div class="dropdown-divider"></div>']).concat(btnList);
  return btnList;
}

function buildDropDownBtn(cityObj){
  const html = `<button type='button' class='dropdown-item' value='${cityObj.latitude},${cityObj.longitude}'>
                  ${cityObj.city}, ${cityObj.state_abbr} ${cityObj.zipcode}
                </button>`;
  return html;
}

function buildForeignCities(){
  const fCities = {
    london: {
      country: "England",
      latitude: "51.5074",
      longitude: "-0.1278"
    },
    cairo: {
      country: "Egypt",
      latitude: "30.0444",
      longitude: "31.2357"
    },
    beijing: {
      country: "China",
      latitude: "39.9042",
      longitude: "116.4074"
    },
    johannesburg: {
      country: "South Africa",
      latitude: "-26.2041",
      longitude: "28.0473"
    },
    auckland: {
      country: "New Zealand",
      latitude: "-36.8485",
      longitude: "174.7633"
    },
    santiago: {
      country: "Chile",
      latitude: "-33.4489",
      longitude: "-70.6693"
    },
    faro: {
      country: "Canada",
      latitude: "62.2285",
      longitude: "133.3532"
    }
  }

  let forCities = Object.keys(fCities).map(function(cityName){
    return buildFCityBtn(cityName, fCities[cityName]);
  });
  return forCities;
}

function buildFCityBtn(name, fCityObj){
  name = name[0].toUpperCase() + name.substring(1);
  const html = `<button type='button' class='dropdown-item' value='${fCityObj.latitude},${fCityObj.longitude}'>
                  ${name}, ${fCityObj.country}
                </button>`;
  return html;
}
