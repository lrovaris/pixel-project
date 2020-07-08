function anim_in_new_row(sprite) {

  const metadata = sprite.metadata
  let png_data = sprite.data

  const animationQuantity = metadata.metadata.animations.length;

  const height = png_data.height;
  const width = png_data.width;

  const frameSize = width/metadata.metadata.framesQuantity

  const animations = metadata.metadata.animations

  let maxFrames = 0

  for (var i = 0; i < animations.length; i++) {
    if(animations[i].frames > maxFrames){
      maxFrames = animations[i].frames
    }

  }


  const new_height = height * animationQuantity;
  const new_width = frameSize * maxFrames;

  let newData = []
  let rel_idx = 0

  for (var i = 0; i < animations.length; i++) {

    let initial_x = 0
    let final_x = 0

    for (let index = 0; index <= i; index++) {

      initial_x = final_x

      final_x +=  frameSize * animations[index].frames
    }

    let initial_y = i * height

    console.log("initial_x", initial_x);

    console.log("final_x", final_x);

    console.log("initial_y", initial_y);

    for (let y = 0; y < height; y++) {
      for (let x = initial_x; x < (new_width + initial_x); x++) {

        let idx = (width * y + x) << 2;

        let newDataIdx = ((new_width * (y + initial_y)) + (x - initial_x)) << 2;

        if(x === initial_x && y === 0){

          console.log(newDataIdx);
        }



        if(x <= final_x){

          newData[newDataIdx] = png_data.data[idx]
          newData[newDataIdx + 1] = png_data.data[idx + 1]
          newData[newDataIdx + 2] = png_data.data[idx + 2]
          newData[newDataIdx + 3] = png_data.data[idx + 3]

        }else {

          newData[newDataIdx] = 0
          newData[newDataIdx + 1] = 0
          newData[newDataIdx + 2] = 0
          newData[newDataIdx + 3] = 0

        }




      }
    }

  }

  // for (let y = 0; y < new_height; y++) {
  //   for (let x = 0; x < new_width; x++) {
  //     let idx = (new_width * y + x) << 2;
  //
  //     const current_animation_index = Math.floor(y/height);
  //
  //     if(x <= animations[current_animation_index].frames * frameSize){
  //
  //       newData[idx] = png_data.data[idx - rel_idx]
  //       newData[idx + 1] = png_data.data[idx - rel_idx + 1]
  //       newData[idx + 2] = png_data.data[idx - rel_idx + 2]
  //       newData[idx + 3] = png_data.data[idx  - rel_idx + 3]
  //
  //     }else {
  //
  //       newData[idx] = 0
  //       newData[idx + 1] = 0
  //       newData[idx + 2] = 0
  //       newData[idx + 3] = 0
  //
  //       rel_idx+= 4
  //
  //     }
  //
  //
  //   }
  // }


  png_data.data = newData
  png_data.height = new_height
  png_data.width = new_width



  return({
    data: png_data,
    metadata: metadata
  })
}


module.exports = { anim_in_new_row  };
