const express = require('express');
const router = express.Router();
const user = require('../services/user');

/* GET multiple users */
router.get('/', async function (req, res, next) {
  try {
    res.json(await user.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* GET user by id */
router.get('/:id', async function (req, res, next) {
  console.log("req.params.id=" + req.params.id);//A supprimer
  let userId = (req.params.id).substring(1); //req.params sert à couper l'URL au niveau de "id", substring permet d'enlever la 1ere valeur de gauche (ici les :)
  console.log("userID=" + userId);//A supprimer
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

/* POST user */
router.post('/', async function (req, res, next) {
  try {
    res.json(await user.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

/* PUT user */
router.put('/:id', async function (req, res, next) {
  let userId = (req.params.id).substring(1);
  try {
    res.json(await user.update(userId, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

/* DELETE user by Id */
router.delete('/:id', async function (req, res, next) {
  let userId = (req.params.id).substring(1);
  try {
    res.json(await user.remove(userId));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

module.exports = router;