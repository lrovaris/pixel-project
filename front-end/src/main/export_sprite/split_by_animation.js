function split_by_animation(sprite) {

  const metadata = sprite.metadata
  let png_data = sprite.data

  const animationQuantity = metadata.metadata.animations.length;
  const height = png_data.height;
  const width = png_data.width;

  const frameSize = width/metadata.metadata.framesQuantity

  let animations = []


  for (var i = 0; i < animationQuantity; i++) {

    let anim_data = metadata.metadata.animations[i]

    let this_animation = {}

    this_animation['data'] = Object.fromEntries(Object.entries(png_data));
    this_animation['metadata'] =  Object.fromEntries(Object.entries(metadata)); ;


    this_animation.metadata.name = anim_data.name



    this_animation.data.data = []
    this_animation.data.width = frameSize * anim_data.frames

    let initial_pos = 0;
    let final_pos = frameSize * metadata.metadata.animations[0].frames

    for (let index = 0; index < i; index++) {

      initial_pos = final_pos

      final_pos +=  frameSize * metadata.metadata.animations[index+1].frames
    }

    for (let y = 0; y < height; y++) {
      for (let x = initial_pos; x < final_pos; x++) {
        let idx = (width * y + x) << 2;

        this_animation.data.data.push(png_data.data[idx])
        this_animation.data.data.push(png_data.data[idx + 1])
        this_animation.data.data.push(png_data.data[idx + 2])
        this_animation.data.data.push(png_data.data[idx + 3])

      }
    }


    console.log(anim_data.name, anim_data.frames);


    animations.push(this_animation)

  }



  return(animations)
}


module.exports = { split_by_animation  };
