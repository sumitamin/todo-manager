var express = require('express');
var router = express.Router();
const controller = require('../controllers');
const Auth = require('../middleware')

router.post('/signUp', controller.signUp);
router.post('/logIn', controller.logIn)
router.use(Auth)
router.post('/fetchTask', controller.fetchTask);
router.post('/addTask', controller.addTask);
router.post('/deleteTask', controller.deleteTask);
router.post('/updateTask', controller.updateTask);
router.post('/archiveTask', controller.archiveTask);
router.post('/fetchArchiveTask', controller.fetchArchiveTask);
router.post('/priorityTask', controller.priorityTask);

module.exports = router;