const fs = require("fs");
const PNG = require("pngjs").PNG;

function get_image_data(sprite) {

  let base_img = `./metadata/${sprite.path}`;

  const data = fs.readFileSync(base_img);
  const png = PNG.sync.read(data);

  return{
    data:png,
    metadata: sprite
  }

}

module.exports = { get_image_data };
