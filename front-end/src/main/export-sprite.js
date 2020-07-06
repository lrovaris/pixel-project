const fs = require("fs");

// const { get_image_data } = require('./export_sprite/get_image_data')
const { layer_image } = require('./export_sprite/layer_image')
const { scale_image } = require('./export_sprite/scale_image')

async function export_sprite(path, params, sprite_data, callback) {

  // const image_data_array =  await Promise.all(
  //
  //   sprite_data.map( async sprite => {
  //     const this_sprite_data = await get_image_data(sprite)
  //
  //     return this_sprite_data
  //   })
  //
  // )

  // console.log(image_data_array);


  const layered_data = await layer_image(sprite_data, [], 0);



  const scaled_image = scale_image(layered_data, params.scale)

  path = path.replace('.png', '')
  path = path.replace('.pxl', '')

  scaled_image
  .pack()
  .pipe(fs.createWriteStream(`${path}.png`))
  .on("finish", () => {

    callback({ message: "Finalizado" })

  })

}



module.exports = { export_sprite };
