const express = require('express');
const router = express.Router();
const usersController = require('./controllers/user.js');
const carsController = require('./controllers/car.js');
const errorHandler = require('./middlewares/errorHandler');
const { checkAdmin, checkLoggedIn, checkLoggedUser, checkMail } = require('./middlewares/checks');
const bodyParser = require('body-parser');


router.use(bodyParser.json())
router.post('/login', usersController.login)
router.post('/register', usersController.register)
router.get('/users', usersController.getUsers)
router.get('/users/:id',usersController.getUser)
router.put('/users/:id', [checkAdmin] ,usersController.editUser)
router.delete('/users/:id', usersController.deleteUser)
router.post('/user', [checkMail], usersController.addUser)
router.get('/cars', carsController.getCars)
router.get('/cars/:id',carsController.getCar)
router.put('/cars/:id', carsController.editCar)
router.delete('/cars/:id', carsController.deleteCar)
router.post('/car', carsController.addCar)
router.use(errorHandler.notFound);

module.exports = router;