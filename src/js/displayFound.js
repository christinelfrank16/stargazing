import $ from 'jquery';

export function displayFound(fovConsts){
  fovConsts.forEach(function(constellation){
    if(constellation.completed){
      const maxDims = findStarMaxXY(constellation.stars);
      const minDims = findStarMinXY(constellation.stars);
      const dimXDelta = maxDims[0]-minDims[0];
      const dimYDelta = maxDims[1]-minDims[1];

      let divWrap = buildDivWrap(constellation);
      let constCanv = buildStartCanvas(constellation, dimXDelta, dimYDelta);
      divWrap.insertAdjacentElement('beforeend', constCanv);
      $('#foundConsts').append(divWrap);
      buildConstDisplay(constCanv, constellation, minDims, dimXDelta, dimYDelta);
    }
  });
}

function buildDivWrap(constellation){
  let div = document.createElement('div');
  div.innerHTML = `<h4 class="fConst">${constellation.name}</h4>`;
  return div;
}

function findStarMaxXY(stars){
  let maxX = 0;
  let maxY = 0;
  stars.forEach(function(star){
    if(star.x > maxX){
      maxX = star.x;
    }
    if(star.y > maxY){
      maxY = star.y;
    }
  });
  return [maxX, maxY];
}

function findStarMinXY(stars){
  let minX = stars[0].x;
  let minY = stars[0].y;
  stars.forEach(function(star){
    if(star.x < minX){
      minX = star.x;
    }
    if(star.y < minY){
      minY = star.y;
    }
  });
  return [minX, minY];
}

function buildStartCanvas(constellation, dimXDelta, dimYDelta){
  let canvas = document.createElement('canvas');
  canvas.id = constellation.name + "-canvas";
  canvas.width = (Math.ceil(dimXDelta)/10)*10 + 10;
  canvas.height = (Math.ceil(dimYDelta)/10)*10 + 10;
  return canvas;
}


function buildConstDisplay(canvas, constellation, minDims, dimXDelta, dimYDelta){
  let ctx = canvas.getContext('2d');
  constellation.stars.forEach(function(star) {
    ctx.strokeStyle = '#9ee6cf';
    ctx.beginPath();
    ctx.strokeRect((star.x-minDims[0])+5, (star.y-minDims[1])+5, 2, 2);
    ctx.stroke();
  });
  constellation.lines.forEach(function(points) {
    const ids = Object.keys(points);
    const id1 = ids[0];
    const id2 = ids[1];
    ctx.strokeStyle = "#1fad9f";
    ctx.beginPath();
    ctx.moveTo((points[id1][0]-minDims[0])+5, (points[id1][1]-minDims[1])+5);
    ctx.lineTo((points[id2][0]-minDims[0])+5, (points[id2][1]-minDims[1])+5);
    ctx.stroke();
  });
}
