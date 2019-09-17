import $  from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// import { SkyMap } from './skyMapApi';
import {ConstellationDetails} from './Constellationinfo';




 $(document).ready(function() {
   $('.nav-link[name=constellations]').click(function() {
      let constellationWiki = new ConstellationDetails();
      console.log(constellationWiki);
      $("#toShow").showConstellations();

// $('.showErrors').display('');









// $(document).ready(function() {
//   $('#submit').click(function() {
//     // const symptoms = $("#userSymptoms").val();
//     // const state = $("#userState").val();
//     // let providerInfo=[];
//
// //
//     let constellationInfo = new SkyMap();
//     let promise = results.getConstInfo();  // call the instance method and pass in user input
//
// //
//     promise.then(function(response) {
//       const body = JSON.parse(response);
//       console.log(body);
//forech loop targeting the body.practices
        // $("#location").append(`<div id=q${i} class="question col-md-4">
        //  <h4 class="category">${body.results[i].category}</h4>


        // $('.constellationInfo').html( `${}`);
//         // $('.showErrors').text(`There was an error processing your request: ${error.message}`);
//     })
  })
});
