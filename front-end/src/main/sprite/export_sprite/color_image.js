function color_image(sprite, exportAs) {

  let changes = [];

  for (let i = 0; i < sprite.metadata.currentColors.length; i++) {

    changes.push({
      old_color: sprite.metadata.originalColors[sprite.metadata.currentColors[i].index],
      new_color: sprite.metadata.currentColors[i].color
    })

  }

  let png_data = sprite.data

  const height = sprite.data.height;
  const width = sprite.data.width;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let idx = (width * y + x) << 2;

      let this_rgba = {
        r: png_data.data[idx],
        g: png_data.data[idx + 1],
        b: png_data.data[idx + 2],
        a: png_data.data[idx + 3]
      }


      for (var i = 0; i < changes.length; i++) {
        let old_color = changes[i].old_color;
        let new_color = changes[i].new_color

        if(old_color.r === this_rgba.r
          && old_color.g === this_rgba.g
          && old_color.b === this_rgba.b
          && old_color.a === this_rgba.a){

              png_data.data[idx] = new_color.r
              png_data.data[idx + 1] = new_color.g
              png_data.data[idx + 2] = new_color.b
              png_data.data[idx + 3] = new_color.a

          }
        }


        if (exportAs === "gif"
        && png_data.data[idx] === 0
        && png_data.data[idx +1] === 0
        && png_data.data[idx +2] === 0
        && png_data.data[idx +3] === 255
      ) {
          png_data.data[idx] = 10
          png_data.data[idx + 1] = 10
          png_data.data[idx + 2] = 10
          png_data.data[idx + 3] = 255
        }

      }
    }

    return({
      metadata: sprite.metadata,
      data: png_data
    })

  }

  module.exports = { color_image  };
