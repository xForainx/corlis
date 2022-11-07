const express = require('express');
const router = express.Router();
const user = require('../services/user');

/* GET multiple users */
router.get('/user', async function (req, res, next) {
  try {
    res.json(await user.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* GET user by id */
router.get('/user:id', async function (req, res, next) {
  let userId = (req.params.id).substring(1); //req.params sert à couper l'URL au niveau de "id", substring permet d'enlever la 1ere valeur de gauche (ici les :)
  /*Condition si on ne met pas de paramètre ID*/
  if (!userId) { 
    return res.status(400).json({
      message: "missing Parameter"
    })
  }
  try {
    //res.json(await user.getUserByID(req.query.page));
    res.json(await user.getUserByID(userId));
  } catch (err) {
    console.error('Error while getting user by id', err.message);
    next(err);
  }
});

module.exports = router;