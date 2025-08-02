const express = require('express')
const router = express.Router();
const coursesController = require('../controllers/courses.controller.js');

router.route('/')
    .get(coursesController.getAllCourses)
    .post(coursesController.addCourse);

router.route('/:courseId')
    .get(coursesController.getCourse)
    .patch(coursesController.updateCourse)
    .delete(coursesController.deleteCourse);

module.exports = router;
