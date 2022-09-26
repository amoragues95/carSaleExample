const db = require('../models/index');
const { car, User } = db;

const getCars = (req, res, next) => {
    car.findAll({ include: User})
        .then(cars => res.status(200).send(cars))
        .catch(err => next(err))
}

const getCar = (req, res, next) => {
    const id = req.params.id;
    car.findOne({ where: { id }})
        .then(car => res.status(200).send(car))
        .catch(err => next(err));
}

const addCar = (req, res, next) => {
        car.create(req.body)
        .then(car => res.status(201).send("car Created"))
        .catch(err => next(err))     
}

const editCar = (req, res, next) => {
    const id = req.params.id;
    const newcar = req.body;
    console.log(newcar);
    car.update(newcar, { where: { id }})
        .then(car => res.status(200).send("car Updated"))
        .catch(err => next(err));
}

const deleteCar = (req, res, next) => {
    const id = req.params.id;
    car.destroy({ where: { id } })
        .then(() => res.status(200).send("car Destroyed"))
        .catch(err => next(err));
}

module.exports = {
    getCars,
    getCar,
    editCar,
    deleteCar,
    addCar
}