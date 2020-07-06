function scale_image(data, scale){

  if(scale === 'normal'){
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

  for (let y = 0; y < data.height; y++) {
    for (let x = 0; x < data.width; x++) {
      let base_idx = ((data.width * y  + x) << 2);

      let all_idx = []

      for (var i = 0; i < scale; i++) {

        for (var j = 0; j < scale; j++) {

          let new_idx = ((( (data.width * scale) * ((y * scale) + j) + ((x * scale) + i)) << 2))
          all_idx.push(new_idx);

        }
      }


      for (var i = 0; i < all_idx.length; i++) {
        new_data[all_idx[i]] = data.data[base_idx]
        new_data[all_idx[i] +1] = data.data[base_idx +1]
        new_data[all_idx[i] +2] = data.data[base_idx +2]
        new_data[all_idx[i] +3] = data.data[base_idx +3]
      }


    }
  }

  data.height *= scale
  data.width *= scale

  data.data = new_data

  return data
}

module.exports = { scale_image };
