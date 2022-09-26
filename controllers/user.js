const db = require('../models/index');
const { User, car } = db;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    let body = req.body
    User.findOne({ email: body.email }).then(usuarioDB => {
        if (!usuarioDB) {
            return res.status(400).json({
              ok: false,
              err: {
                  message: "Usuario o contraseña incorrectos"
              }
           })
         }
      // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
         if (! bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
               ok: false,
               err: {
                 message: "Usuario o contraseña incorrectos"
               }
            });
         }
      // Genera el token de autenticación
          let token = jwt.sign({
                 usuario: usuarioDB,
              }, process.env.SEED_AUTENTICACION, {
              expiresIn: process.env.CADUCIDAD_TOKEN
          })
          res.json({
              ok: true,
              usuario: usuarioDB,
              token,
          })
    }).catch(error => next(error));
}

const register = (req, res, next) => {
    let { nombre, email, password, role } = req.body;
    let usuario = new User({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        role
      });
    User.create(usuario).then(usuarioDB => {
        return res.json({
            ok: true,
            usuario: usuarioDB
         }).end();
    })
}

const getUsers = (req, res, next) => {
    User.findAll({ include: car })
        .then(users => res.status(200).send(users))
        .catch(err => next(err))
}

const getUser = (req, res, next) => {
    const id = req.params.id;
    User.findOne({ where: { id }, include: car})
        .then(user => res.status(200).send(user))
        .catch(err => next(err));
}

const addUser = (req, res, next) => {
        User.create(req.body)
        .then(user => res.status(201).send("User Created"))
        .catch(err => next(err))     
}

const editUser = (req, res, next) => {
    const id = req.params.id;
    const newUser = req.body;
    console.log(newUser);
    User.update(newUser, { where: { id }})
        .then(user => res.status(200).send("User Updated"))
        .catch(err => next(err));
}

const deleteUser = (req, res, next) => {
    const id = req.params.id;
    User.destroy({ where: { id } })
        .then(user => res.status(200).send("User Destroyed"))
        .catch(err => next(err));
}

module.exports = {
    getUsers,
    getUser,
    editUser,
    deleteUser,
    addUser,
    login,
    register
}