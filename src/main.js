import $  from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { SkyMap } from './skyMapApi';



// $(document).ready(function() {
//   $('#submit').click(function() {
//     const symptoms = $("#userSymptoms").val();
//     const state = $("#userState").val();
//     let providerInfo=[];
//
//
//     let results = new DocSearch();
//     let promise = results.searchparameters(state,symptoms);  // call the instance method and pass in user input
//
//
//     promise.then(function(response) {
//       const body = JSON.parse(response);
//       for(let i=0; i < 10; i++) {
//         providerInfo[i] = body.data[i].practices;
// //forech loop targeting the body.practices
//         $("#location").append(`<div id=q${i} class="question col-md-4">
//          <h4 class="category">${body.results[i].category}</h4>
//
//       }
//
//        $('.doctor').html( `Displaying a list of providers in ${state} ,  ${body.data[0,1].profile}`);
//
//
//     }, function(error) {
//       $('.showErrors').text(`There was an error processing your request: ${error.message}`);
//     });
//   });
// });
