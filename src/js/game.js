import { Star, generateRandomStars, getClickedPosition } from './starStuff.js';
var cvs = document.getElementById("gameCanvas");
var ctx = cvs.getContext("2d");
var canvasWidth = document.getElementById("gameCanvas").width;
var canvasHeight = document.getElementById("gameCanvas").height;

cvs.addEventListener("click", function(event){
  getClickedPosition(cvs,event);
})



//imgs
var star = new Image();

//sounds
var correct = new Audio();

//randomly generate stars
var colorArray = ['#faef8e'];
var starsArray = generateRandomStars(500, canvasWidth, canvasHeight, colorArray);


//separate starsArray of general stars (just coordinates) and constellation objecfts


//event listener: add event listener to each star element of a constellation
//determine what properties stars need

//add event listener for


//draw function
export function draw(localConstalltion) {


  //if you need to draw some image (the 0,0 starts top left)
  // ctx.drawImage(imgName,x,y);


  //draw all constellation stars
  localConstalltion.forEach(function(constellation) {
    constellation.stars.forEach(function(star){
      ctx.strokeStyle = "#33FFF6";
      ctx.beginPath();
      ctx.strokeRect(star.x, star.y, 2, 2);
      ctx.stroke();
    });
  });
  //draw all random stars
  starsArray.forEach(function(star) {
    ctx.strokeStyle = "#faef8e";
    ctx.beginPath();
    ctx.strokeRect(star.x, star.y, 2, 2);
    ctx.stroke();
  });

  //code to draw your lines (greyed out), if you click and mouse over 2 points that are correct, then you can have a green line for success

  //need to check if line is a success, have you collected all the lines for that constellation? light up constellation

  //if you have collected all the lines, then give success page to show the real stars and constellations from the api, and reload the page

  //spits back the time for you so you can see how long you've played;

  //recursive call on itself so you can just call draw once.
  // requestAnimationFrame(draw);
}
