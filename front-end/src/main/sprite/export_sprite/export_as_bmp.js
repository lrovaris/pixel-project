const Jimp = require("jimp")

function export_as_bmp(fileNames, path, fileName, callback) {


  let iterator = 0;

  fileNames.forEach(([png_path, final_path]) => {

    Jimp.read(png_path, function (err, image) {
      iterator++;
      if (err) {
        console.log(err)
      } else {

        const targetStr = `${final_path}.bmp`

        image.write(targetStr)

      }

      if(iterator === fileNames.length){
        callback("terminado")
      }
    })


  });






}

module.exports = { export_as_bmp };
