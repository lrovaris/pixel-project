const db = require('../db');

const { get_metadata_by_id } = require('./getController')

async function edit_metadata(metadata_id, modifications) {

  let original_metadata = await get_metadata_by_id(metadata_id);

  // Editando objeto
  let edited_entries = Object.entries(original_metadata.metadata)
  .map(([key, value]) =>{ return [key, modifications[key] || value]; })

  let new_entries = Object.entries(modifications).filter(([key,value]) => {
    let exists = edited_entries.find(([key_e, value_e]) => {
      return key_e === key;
    })
    return exists === undefined;
  })

  for (var i = 0; i < new_entries.length; i++) {
    edited_entries.push(new_entries[i])
  }

  let edited_object = Object.fromEntries(edited_entries);

  original_metadata.metadata = edited_object

  // Salvando objeto editado
  let edited_metadata = await db.update_metadata(original_metadata).catch(err => logger.error(err));

  return edited_metadata
}

module.exports = {
  edit_metadata
};
