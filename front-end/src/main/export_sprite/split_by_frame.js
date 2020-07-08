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
    this_frame['metadata'] = metadata;

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
