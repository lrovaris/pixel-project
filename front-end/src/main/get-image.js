const fs = require('fs');

async function get_local_image(path, callback) {

  let img = fs.readFileSync(`./metadata/${path}`)

  let base64Image = new Buffer(img, 'binary').toString('base64');

  let imgSrcString = `data:image/png;base64,${base64Image}`;

  callback({
    name: path,
    newImg: imgSrcString
  });
}

module.exports = {
  get_local_image
}
