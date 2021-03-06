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


  png_data.data = newData
  png_data.height = new_height
  png_data.width = new_width



  return({
    data: png_data,
    metadata: metadata
  })
}


module.exports = { anim_in_new_row  };
