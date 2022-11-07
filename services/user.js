const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, first_name, email 
    FROM user LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getUserByID(id) {
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, first_name, email 
    FROM user WHERE id=${id}`
  );
  //const data = helper.emptyOrRows(rows); //A supprimer (je garde quand même cette vieille ligne en attendant d'être sûr que la condition en dessous fonctionne tout le temps)

  /*Condition pour vérifier que l'id existe en base*/
  if (!rows.length) {
    return "user does not exist";
  }
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

module.exports = {
  getMultiple,
  getUserByID
}