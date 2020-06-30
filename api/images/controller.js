const { get_metadata_from_image } = require("./controllers/uploadController")

const { delete_metadata } = require('./controllers/deleteController')

const { get_metadata, get_metadata_by_id } = require("./controllers/getController")

const { edit_metadata } = require('./controllers/editController')

module.exports = {  get_metadata, delete_metadata, get_metadata_from_image, edit_metadata, get_metadata_by_id };
