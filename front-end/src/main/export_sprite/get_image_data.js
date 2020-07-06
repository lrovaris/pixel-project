const fs = require("fs");
const PNG = require("pngjs").PNG;

async function get_image_data(sprite) {

  let base_img = `./metadata/${sprite.path}`;

  return new Promise((resolve, reject) => {

    fs.createReadStream(base_img)
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on("parsed", (data) => {



      resolve(data)

    })
    .on("error", (err) => {
      reject(err)
    })

  })


}

module.exports = { get_image_data };
