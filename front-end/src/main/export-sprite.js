const fs = require("fs");
const PNG = require("pngjs").PNG;

const { get_image_data } = require('./export_sprite/get_image_data')
const { layer_image } = require('./export_sprite/layer_image')
const { scale_image } = require('./export_sprite/scale_image')
const { color_image } = require('./export_sprite/color_image')
const { split_by_frame } = require('./export_sprite/split_by_frame')
const { split_by_animation } = require('./export_sprite/split_by_animation')
const { anim_in_new_row } = require('./export_sprite/anim_in_new_row')




async function export_sprite(path, params, sprite_data, callback) {

  const image_data_array =  sprite_data.map( sprite => {
    const this_sprite_data = get_image_data(sprite)

    return this_sprite_data
  })

  const colored_image_array = image_data_array.map( sprite => {
    const this_sprite_colored_image = color_image(sprite);

    return this_sprite_colored_image
  })


  let post_layer_images = []

  if(params.layersAsSeparateFiles){

    post_layer_images = colored_image_array

  }else {

    const layered_data = layer_image(colored_image_array, [], 0);

    post_layer_images.push(layered_data)

  }



  let post_split_images = []


  if(params.exportAs === 'frames'){

    const frame_split_imgs = post_layer_images.map(img => {
      const split_img = split_by_frame(img)

      return split_img
    })

    for (var i = 0; i < frame_split_imgs.length; i++) {

      for (var j = 0; j < frame_split_imgs[i].length; j++) {

        post_split_images.push(frame_split_imgs[i][j])

      }
    }


  }else if(params.exportAs === 'spritesheet' && params.animationAsSeparateFile) {

    const anim_split_images = post_layer_images.map(img => {
      const split_img = split_by_animation(img)

      return split_img
    })



    for (var i = 0; i < anim_split_images.length; i++) {

      for (var j = 0; j < anim_split_images[i].length; j++) {

        post_split_images.push(anim_split_images[i][j])

      }
    }

  }else if (params.exportAs === 'spritesheet' && params.animationAsNewRow) {

    post_split_images = post_layer_images.map(img => {
      const new_img = anim_in_new_row(img)

      return new_img
    })

  }
  else {

    post_split_images = post_layer_images

  }



  const scaled_image_array = post_split_images.map( sprite => {
    const this_scaled_image = scale_image(sprite, params.scale)

    return this_scaled_image
  })


  path = path.replace('.png', '')
  path = path.replace('.pxl', '')

  for (var i = 0; i < scaled_image_array.length; i++) {

    const png_data = scaled_image_array[i].data
    const buffer = PNG.sync.write(png_data);


    if(scaled_image_array.length === 1){

      fs.writeFileSync(`${path}.png`, buffer);

    }else {

      let this_path = path;

      if(params.exportAs === 'spritesheet' && params.animationAsSeparateFile){

        scaled_image_array[i].metadata.name = scaled_image_array[i].metadata.name.replace('//', '')
        scaled_image_array[i].metadata.name = scaled_image_array[i].metadata.name.replace('\\', '')
        scaled_image_array[i].metadata.name = scaled_image_array[i].metadata.name.replace('/', '')

        this_path = `${this_path}_${scaled_image_array[i].metadata.name}`

        if(params.layersAsSeparateFiles){
          this_path = `${this_path}_${i+1}`
        }

      }else {
        this_path = `${this_path}_${i+1}`
      }

      fs.writeFileSync(`${this_path}.png`, buffer);

    }

  }


}



module.exports = { export_sprite };
