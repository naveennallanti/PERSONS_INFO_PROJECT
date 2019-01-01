const express = require('express');
const router = express.Router();

// Services
const studentSrv = require('../services/student.service');

router.get('/person',studentSrv.getPersonsList);
router.post('/person',studentSrv.addPerson);
router.put('/person/:id',studentSrv.updatePersonDetails);
router.delete('/person/:id',studentSrv.deletePerson);
router.get('/person/:id',studentSrv.getPersonDetails);

module.exports = router;