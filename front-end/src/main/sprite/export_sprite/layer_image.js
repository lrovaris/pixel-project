
function layer_image(sprite_array, pixels, iterator) {

  let png_data = sprite_array[iterator].data

  const height = png_data.height;
  const width = png_data.width;


  if(pixels.length === 0){
    pixels = png_data.data
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let idx = (width * y + x) << 2;

      let this_rgba = {
        r: png_data.data[idx],
        g: png_data.data[idx + 1],
        b: png_data.data[idx + 2],
        a: png_data.data[idx + 3]
      }

      if(this_rgba.r === 0
        && this_rgba.g === 0
        && this_rgba.b === 0
        && this_rgba.a === 0
      ){
        continue;
      }

        pixels[idx] = png_data.data[idx]
        pixels[idx + 1] = png_data.data[idx + 1]
        pixels[idx + 2] = png_data.data[idx + 2]
        pixels[idx + 3] = png_data.data[idx + 3]
      }
    }

    iterator++
    if(iterator < sprite_array.length){

      return layer_image(sprite_array, pixels, iterator);

    }else {
      png_data.data = pixels

      return({
        metadata: sprite_array[0].metadata,
        data: png_data
      })
    }


  }

  module.exports = { layer_image  };
