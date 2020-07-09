function split_by_frame(sprite) {

  const metadata = sprite.metadata
  let png_data = sprite.data


  const framesQuantity = metadata.metadata.framesQuantity;
  const height = png_data.height;
  const width = png_data.width;

  const frameSize = width/framesQuantity

  let frames = []

  for (var i = 0; i < framesQuantity; i++) {

    let this_frame = {}

    this_frame['data'] = Object.fromEntries(Object.entries(png_data));
    this_frame['metadata'] = Object.fromEntries(Object.entries(metadata));



    frame_iterator = 0;
    for (var j = 0; j < this_frame.metadata.metadata.animations.length; j++) {

      this_frame.metadata.metadata.animations[j].frames = Number(this_frame.metadata.metadata.animations[j].frames)

      this_frame.metadata.name = this_frame.metadata.metadata.animations[j].name

      if(i < frame_iterator + this_frame.metadata.metadata.animations[j].frames){
        break;
      }

      frame_iterator += this_frame.metadata.metadata.animations[j].frames
    }

    this_frame.data.data = []
    this_frame.data.width = frameSize

    for (let y = 0; y < height; y++) {
      for (let x = (frameSize*i); x < ((frameSize*i) + frameSize); x++) {
        let idx = (width * y + x) << 2;

        this_frame.data.data.push(png_data.data[idx])
        this_frame.data.data.push(png_data.data[idx + 1])
        this_frame.data.data.push(png_data.data[idx + 2])
        this_frame.data.data.push(png_data.data[idx + 3])

      }
    }

    frames.push(this_frame)

  }

  return(frames)
}


module.exports = { split_by_frame  };
