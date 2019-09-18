import $  from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { SkyMap } from './skyMapCalls';
import { LatLongConverter } from './LatLongConverter';
import {ConstellationDetails} from './Constellationinfo';
let cities = require('cities');
import { populateCityDropDown } from './cityDropDown';

 $(document).ready(function() {
   let converter = new LatLongConverter(45.5051, -122.6750); // default to portland, OR
   buildDropDown("");
   $('.nav-link[name=constellations]').click(function() {
      let constellationWiki = new ConstellationDetails();
      console.log(constellationWiki);
      $("#toShow").showConstellations();

// $('.showErrors').display('');
  });

  $('#searchLocation').on('input', function(){
    filterCities($('#searchCities').val().trim().toLowerCase());
  });

  $('#searchLocation').submit(function(event){
    event.preventDefault();
    const searchValue = $('#searchCities').val();
    buildDropDown(searchValue);
    $('#searchCities').val('');
  });

  $('#cityItems').on('click', '.dropdown-item', function(){
    const cityLatLong = $(this)[0].value;
    const lat = parseFloat(cityLatLong.substring(0, cityLatLong.indexOf(',')));
    const long = parseFloat(cityLatLong.substring(cityLatLong.indexOf(',')+1));
    converter = new LatLongConverter(lat, long);
    console.log(converter);
    $('#citiesDropDown').text($(this)[0].innerHTML);
    $('#citiesDropDown').dropdown('toggle');
  });


});


function buildDropDown(input){
  let cityList = $('#cityItems');
  cityList.html(populateCityDropDown(input).join(''));
  $('#empty').hide();
}

function filterCities(word){
  let items = $('.dropdown-item');
  let length = items.length;
  let collection = [];
  let hidden = 0;

  for(let i=0; i< length; i++){
    if($(items[i])[0].innerHTML.toLowerCase().includes(word)){
      $(items[i]).show();
    } else {
      $(items[i]).hide();
      hidden++;
    }
  }

  if(hidden === length){
    $('#empty').show();
  } else {
    $('#empty').hide();
  }
}
