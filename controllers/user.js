const db = require('../models/index');
const { User, car } = db;

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
    addUser
}