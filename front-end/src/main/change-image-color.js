const PNG = require('png-js');
const fs = require("fs");
const SPNG = require("pngjs").PNG;

const { get_local_image } = require("./get-image")

function change_image_color(path, changes, callback) {

  const base_img = `./metadata/${path}`;

  fs.createReadStream(base_img)
  .pipe(
    new SPNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let idx = (this.width * y + x) << 2;

        let this_rgba = {
          r: this.data[idx],
          g: this.data[idx + 1],
          b: this.data[idx + 2],
          a: this.data[idx + 3]
        };

        for (var i = 0; i < changes.length; i++) {
          let old_color = changes[i].old_color;
          let new_color = changes[i].new_color;

          if(old_color.r === this_rgba.r
            && old_color.g === this_rgba.g
            && old_color.b === this_rgba.b
            && old_color.a === this_rgba.a){

              this.data[idx] = new_color.r;
              this.data[idx + 1] = new_color.g;
              this.data[idx + 2] = new_color.b;
              this.data[idx + 3] = new_color.a

            }
        }

        }
      }

      this
      .pack()
      .pipe(fs.createWriteStream(`./metadata/temp/${path}`))
      .on("finish", () => {

        get_local_image(`temp/${path}`, (image) => {
          callback({name: path,  newImg: image.newImg})
        })

      })
    });
}

module.exports = { change_image_color };
