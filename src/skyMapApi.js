export class SkyMap {
  constructor(){
    this.coordsUrl = 'http://server1.sky-map.org/search';  //http://server7.wikisky.org/XML_API_V1.0.html



  }
  getStarCoords(starName){
    return new Promise((resolve,reject) => {
      let request = new XMLHttpRequest();
      const url = `${this.coordsUrl}?star=${starName}`;

      request.onload = function(){
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(new Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  getConstCoords(constellationName){
    return new Promise((resolve,reject) => {
      let request = new XMLHttpRequest();
      const url = `${this.coordsUrl}?object=${starName}`;

      request.onload = function(){
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(new Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  getStarMapImg(){

  }


  //
  buildStarMap(ra, de, rotation, showBoundaries = 0, showGrid = 0, showConstLines = 0, showConstNames = 0){
    const mapTemplate = `
      http://server7.wikisky.org/map?custom=1&language=EN&type=PART&w=900&h=450
      &angle=180&ra=${ra}&de=${de}&rotation=${rotation}&mag=10&max_stars=100000&zoom=1000&borders=0&border_color=400000&show_grid=${showGrid}&grid_color=404040&grid_color_zero=808080&grid_lines_width=1.0&grid_ra_step=1.0&grid_de_step=15.0&show_const_lines=${showConstLines}&constellation_lines_color=006000&constellation_lines_width=1.0&show_const_names=${showConstNames}&constellation_names_color=006000&const_name_font_type=PLAIN&const_name_font_name=SanSerif&const_name_font_size=15&show_const_boundaries=0&constellation_boundaries_color=000060&constellation_boundaries_width=1.0&background_color=000000&output=GIF
    `;
  }



}
