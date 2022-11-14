const express = require('express')
const router = express.Router()
const User = require('../services/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.get('/login', (req, res) => {
    console.log("email=" + req.body.email);// A supprimer
    let email = req.body.email;
    User.getUserByEmail(email).then(user => {
        console.log("on est dans le routes/auth");//A supprimer
        console.log("email = " + email);//A supprimer
        if (!user)
            res.status(404).json({ error: 'no user with that email found' })
        else {
            console.log("req.body.password =" + req.body.password);//A supprimer
            console.log("user.password=" + user.data);//A supprimer
            console.log("true si authentification ok ==> " + bcrypt.compareSync(req.body.password, user.data));//A supprimer
            bcrypt.compare(req.body.password, user.data, (error, match) => {
                console.log("on passe là?");//A supprimer
                if (error) {
                    console.log("error");//A supprimer
                    res.status(500).json(error)
                }
                else if (match) {
                    console.log("match");//A supprimer
                    res.status(200).json({ token: generateToken(user.data) })
                    console.log("on ressort de match")
                }
                else {
                    console.log("else");//A supprimer
                    res.status(403).json({ error: 'passwords do not match' })
                }

            })
        }
    })
        .catch(error => {
            console.log("on passe par le catch error");
            res.status(500).json(error)
        })
});

router.post('/signup', (req, res) => {

});

function generateToken(user) {
    console.log("on est dans le generate token");//A supprimer
    console.log(user);//A supprimer
    return jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: '24h' })
}

module.exports = router