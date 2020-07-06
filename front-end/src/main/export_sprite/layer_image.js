const fs = require("fs");
const PNG = require("pngjs").PNG;

async function layer_image(sprite_array, pixels, iterator) {

    let base_img = `./metadata/${sprite_array[iterator].path}`;

    let changes = [];

    for (let i = 0; i < sprite_array[iterator].currentColors.length; i++) {

      changes.push({
        old_color: sprite_array[iterator].originalColors[sprite_array[iterator].currentColors[i].index],
        new_color: sprite_array[iterator].currentColors[i].color
      })

    }

    return new Promise((resolve, reject) => {



      fs.createReadStream(base_img)
      .pipe(
        new PNG({
          filterType: 4,
        })
      )
      .on("parsed",  async function() {

        if(pixels.length === 0){
          pixels = this.data
        }

        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            let idx = (this.width * y + x) << 2;

            let this_rgba = {
              r: this.data[idx],
              g: this.data[idx + 1],
              b: this.data[idx + 2],
              a: this.data[idx + 3]
            }

            if(this_rgba.r === 0
              && this_rgba.g === 0
              && this_rgba.b === 0
              && this_rgba.a === 0
            ){
              continue;
            }

            for (var i = 0; i < changes.length; i++) {
              let old_color = changes[i].old_color;
              let new_color = changes[i].new_color

              if(old_color.r === this_rgba.r
                && old_color.g === this_rgba.g
                && old_color.b === this_rgba.b
                && old_color.a === this_rgba.a){

                  this.data[idx] = new_color.r
                  this.data[idx + 1] = new_color.g
                  this.data[idx + 2] = new_color.b
                  this.data[idx + 3] = new_color.a

                }
              }

              pixels[idx] = this.data[idx]
              pixels[idx + 1] = this.data[idx + 1]
              pixels[idx + 2] = this.data[idx + 2]
              pixels[idx + 3] = this.data[idx + 3]
            }
          }

          iterator++
          if(iterator < sprite_array.length){

            let answer = await layer_image(sprite_array, pixels, iterator);

            resolve(answer)

          }else {

            this.data = pixels

            resolve(this)
          }

      })
      .on("error", function(err){
        reject(err)
      })

    })


  }

  module.exports = { layer_image  };
