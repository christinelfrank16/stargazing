import $  from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { SkyMap } from './skyMapApi';
import './img/1.jpg';
import './img/2.jpg';
import './img/3.jpg';
import './img/4.jpg';

let ImageSwitch = new Array();
   ImageSwitch[0]='1.jpg';
   ImageSwitch[1]='2.jpg';
   ImageSwitch[2]='3.jpg';
   ImageSwitch[3]='4.jpg';
   console.log(ImageSwitch[0]);
   function swapImage()
   {
       document.getElementById("#theImage").setAttribute("The Constellation", ImageSwitch[

         Math.round(Math.random()*3)])
   }
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
//   });
// });
