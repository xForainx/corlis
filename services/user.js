const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const { application } = require('express');

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

async function create(user){
  console.log(user);//A supprimer

  const result = await db.query(
    `INSERT INTO user (name, first_name, email) VALUES ("${user.name}","${user.first_name}","${user.email}")`
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'user created successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM user WHERE id=${id}`
  );

  let message = 'Error in deleting user';
  //console.log(result.affectedRows) //A supprimer
  if (result.affectedRows) {
    message = `user id=${id} deleted successfully`;
  }

  return {message};
}

module.exports = {
  getMultiple,
  getUserByID,
  create,
  remove
}