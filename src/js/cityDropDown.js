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
  return btnList;
}

function buildDropDownBtn(cityObj){
  const html = `<button type='button' class='dropdown-item' value='${cityObj.latitude},${cityObj.longitude}'>
                  ${cityObj.city}, ${cityObj.state_abbr} ${cityObj.zipcode}
                </button>`;
  return html;
}
