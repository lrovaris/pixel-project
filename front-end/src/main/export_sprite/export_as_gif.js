const GIFEncoder = require('gifencoder');
const pngFileStream = require('png-file-stream');
const fs = require('fs');





function export_as_gif(png_info, write_path, path, fileName, callback) {

  const height = png_info[0].data.height;
  const width =  png_info[0].data.width;

  // Setup displays ou algo assim
  let iterator = 0;

  png_info[0].metadata.metadata.animations.forEach(anim => {

    const encoder = new GIFEncoder(width, height)

    anim.name = anim.name.replace('//', '')
    anim.name = anim.name.replace('\\', '')
    anim.name = anim.name.replace('/', '')

    const glob_str = `${write_path}_${anim.name}_*.png`

    console.log(glob_str);


    const stream = pngFileStream(glob_str)
    .pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
    .pipe(fs.createWriteStream(`${path}/${fileName}_${anim.name}.gif`));

      stream.on('finish', function () {
          iterator++;

        console.log(iterator);
      });

  })






}

module.exports = { export_as_gif };
