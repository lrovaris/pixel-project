function scale_image(data, scale){

  const png_data = data.data;
  const metadata = data.metadata


  if(scale === 'x1'){
    return data
  }

  if(scale === 'x2'){
    scale = 2
  }

  if(scale === 'x3'){
    scale = 3
  }

  if(scale === 'x4'){
    scale = 4
  }


  let new_data = []

  for (let y = 0; y < png_data.height; y++) {
    for (let x = 0; x < png_data.width; x++) {
      let base_idx = ((png_data.width * y  + x) << 2);

      let all_idx = []

      for (var i = 0; i < scale; i++) {

        for (var j = 0; j < scale; j++) {

          let new_idx = ((( (png_data.width * scale) * ((y * scale) + j) + ((x * scale) + i)) << 2))
          all_idx.push(new_idx);

        }
      }


      for (var i = 0; i < all_idx.length; i++) {
        new_data[all_idx[i]] = png_data.data[base_idx]
        new_data[all_idx[i] +1] = png_data.data[base_idx +1]
        new_data[all_idx[i] +2] = png_data.data[base_idx +2]
        new_data[all_idx[i] +3] = png_data.data[base_idx +3]
      }


    }
  }

  png_data.height *= scale
  png_data.width *= scale

  png_data.data = new_data

  return {
    metadata: metadata,
    data: png_data
  }
}

module.exports = { scale_image };
