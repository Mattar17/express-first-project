const courseModel = require('../models/course.js');

const getAllCourses = async (req, res) => {
    const { limit } = req.query;
    const { page } = req.query;
    const skip = (page - 1) * limit;
    console.log(limit, page);
    try {
        const courses = await courseModel
            .find({}, { '__v': false })
            .limit(limit)
            .skip(skip);

        res.status(200).json({ "status": "success", "data": courses });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await courseModel.findById({ _id: req.params.courseId }, { '__v': false });
        if (!course) { res.status(404).json("Course not found") }
        res.status(200).json({ "status": "success", "data": course });
    } catch (error) {
        res.status(500).json(error.message);
    }

};

const addCourse = async (req, res) => {
    try {
        const course = new courseModel({ ...req.body });
        await course.save();
        res.status(200).json({ "status": "success", "data": course });
    } catch (error) {
        res.status(500).json(error.message);
    }

}

const updateCourse = async (req, res) => {
    console.log("Endpoint reached !!!!!!!!!!!!");
    console.log(req.body, req.params.courseId);
    const courseId = req.params.courseId;
    try {
        console.log("in the try block");
        const course = await courseModel.updateOne({ '_id': courseId }, {
            $set: { ...req.body }
        })
        console.log(course);
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json(`Error Happened : ${err}`)
    }

}

const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        await courseModel.deleteOne({ '_id': courseId });
        res.status(200).json("Course Deleted");
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    getAllCourses,
    getCourse,
    updateCourse,
    addCourse,
    deleteCourse
}