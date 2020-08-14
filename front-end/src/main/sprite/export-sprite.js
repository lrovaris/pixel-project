const fs = require("fs");
const PNG = require("pngjs").PNG;

const { get_image_data } = require('./export_sprite/get_image_data')
const { layer_image } = require('./export_sprite/layer_image')
const { scale_image } = require('./export_sprite/scale_image')
const { color_image } = require('./export_sprite/color_image')
const { split_by_frame } = require('./export_sprite/split_by_frame')
const { split_by_animation } = require('./export_sprite/split_by_animation')
const { anim_in_new_row } = require('./export_sprite/anim_in_new_row')

const { export_as_gif } = require('./export_sprite/export_as_gif')
const { export_as_bmp } = require('./export_sprite/export_as_bmp')
const { export_as_jpg } = require('./export_sprite/export_as_jpg')




async function export_sprite(params, sprite_data, callback) {

  const image_data_array =  sprite_data.map( sprite => {
    const this_sprite_data = get_image_data(sprite)

    return this_sprite_data
  })

  const colored_image_array = image_data_array.map( sprite => {
    const this_sprite_colored_image = color_image(sprite, params.exportAs);

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


  if(params.exportAs === 'frames' || params.exportAs === 'gif'){

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

  let path = params.path;

  let fileName = params.fileName;

  fileName = fileName.replace('.png', '')
  fileName = fileName.replace('.pxl', '')
  fileName = fileName.replace('.gif', '')
  fileName = fileName.replace('.png', '')
  fileName = fileName.replace('.jpg', '')



  let write_path = path.toString()

  if(params.exportAs === 'gif'
  || params.fileFormat === 'bmp'
  || params.fileFormat === 'jpg'){

    write_path += 'temp/'

    if(!fs.existsSync(`${write_path}`)){
      fs.mkdirSync(`${write_path}`)
    }

  }

  write_path = write_path + fileName.toString()

  let fileNames = []

  for (var i = 0; i < scaled_image_array.length; i++) {

    const png_data = scaled_image_array[i].data
    const buffer = PNG.sync.write(png_data);


    if(scaled_image_array.length === 1){

      fileNames.push([`${write_path}.png`, `${path.toString()}${fileName.toString()}`])

      fs.writeFileSync(`${write_path}.png`, buffer);

    }else {

      let this_path = write_path.toString();
      let final_path = `${path.toString()}${fileName.toString()}`

      if(params.exportAs === 'spritesheet' && params.animationAsSeparateFile || params.exportAs === 'gif'){

        scaled_image_array[i].metadata.name = scaled_image_array[i].metadata.name.replace('//', '')
        scaled_image_array[i].metadata.name = scaled_image_array[i].metadata.name.replace('\\', '')
        scaled_image_array[i].metadata.name = scaled_image_array[i].metadata.name.replace('/', '')

        this_path = `${this_path}_${scaled_image_array[i].metadata.name}`
        final_path = `${final_path}_${scaled_image_array[i].metadata.name}`

        if(params.layersAsSeparateFiles || params.exportAs === 'gif'){
          this_path = `${this_path}_${i+1}`
          final_path = `${final_path}_${i+1}`
        }

      }else {
        this_path = `${this_path}_${i+1}`
        final_path = `${final_path}_${i+1}`
      }

      fileNames.push([`${this_path}.png`, final_path])

      fs.writeFileSync(`${this_path}.png`, buffer);

    }

  }

  if(params.exportAs === 'gif'){

    export_as_gif(scaled_image_array, write_path, path, fileName, (response) => {
      console.log(response);
    });

  }

  if(params.fileFormat === 'bmp'){

    export_as_bmp(fileNames, path, fileName, (response) => {
      console.log(response);
    });

  }

  if(params.fileFormat === 'jpg'){

    export_as_jpg(fileNames, path, fileName, (response) => {
      console.log(response);
    });

  }


}



module.exports = { export_sprite };
