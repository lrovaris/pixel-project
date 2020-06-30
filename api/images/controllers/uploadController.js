const PNG = require('png-js');
const fs = require("fs");
const SPNG = require("pngjs").PNG;

async function get_metadata_from_image(path, callback) {

  let colors = [];

  PNG.decode(`./uploads/images/${path}`, function(pixels) {

    for (var i = 0; i < pixels.length; i+=4) {
      let this_rgba = {
        r: pixels[i],
        g: pixels[i+1],
        b: pixels[i+2],
        a: pixels[i+3]
      }

      if(this_rgba.a !== 0){
        let current_color = colors.find(this_color => {
          return (this_color.r  === this_rgba.r
            && this_color.g  === this_rgba.g
            && this_color.b  === this_rgba.b
            && this_color.a  === this_rgba.a)
        })

        if(current_color === undefined){
          this_rgba.num = 1;
          colors.push(this_rgba)
        }else {
          current_color.num += 1
        }

      }
    }

    colors.sort((a,b) => {
      return b.num - a.num
    })


    get_height_n_width(colors)
  });

  function get_height_n_width(colors) {


    let metadata = {
      colors: colors
    }

    fs.createReadStream(`./uploads/images/${path}`)
      .pipe(
        new SPNG({
          filterType: 4,
        })
      )
      .on("parsed", function () {

        metadata['width'] = this.width
        metadata['height'] = this.height

        return callback(metadata)
      });
  }

}

module.exports = {
  get_metadata_from_image
}
