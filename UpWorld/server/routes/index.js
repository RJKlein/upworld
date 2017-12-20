const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');

const personsController = require('../controllers').persons;
const assessmentsController = require('../controllers').assessments;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});


router.get('/api', (req, res, next) => res.status(200).send({
  message: 'Welcome to the API!',
}));

router.get('/api/persons', personsController.list);
router.post('/api/persons', personsController.create);
router.get('/api/persons/:personId', personsController.retrieve);
router.put('/api/persons/:personId', personsController.update);
router.delete('/api/persons/:personId', personsController.destroy);

router.post('/api/persons/:personId/assessments', assessmentsController.create);
router.put('/api/persons/:personId/assessments/:assessmentId', assessmentsController.update);
router.delete('/api/persons/:personId/assessments/:assessmentId', assessmentsController.destroy);

// For any other request method on assessment items, we're going to return "Method Not Allowed"
router.all('/api/persons/:personId/assessments', (req, res, next) =>
  res.status(405).send({
    message: 'Method Not Allowed',
}));

module.exports = router;
