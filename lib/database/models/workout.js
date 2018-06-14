//@ts-check
/**
 * @typedef {Object} WorkoutStep
 * @property {Number} stepIndex
 * @property {String} reps
 * @property {Number} sets
 * @property {String} description
 */
const mongoose = require("mongoose");

const WorkoutStepSchema = new mongoose.Schema({
  stepId: { type: String, required: true },
  stepIndex: { type: Number, required: true },
  reps: { type: String, required: true },
  sets: { type: Number, required: true },
  description: { type: String }
});

const WorkoutSchema = new mongoose.Schema(
  {
    workoutId: { type: String, required: true },
    userId: { type: String, required: true },
    dateTime: { type: Number, required: true },
    gymId: { type: String, required: true },
    workoutSteps: [WorkoutStepSchema],
    completed: { type: Boolean, required: true, default: false },
    otherDetails: { type: String, required: false }
  },
  { collection: "session_91372" }
);

const WorkoutModel = mongoose.model("session_91372", WorkoutSchema);

const projection = { _id: 0, __v: 0, "workoutSteps._id": 0 };

const Workout = {
  findAll() {
    return WorkoutModel.find({}, projection).then(result => result || []);
  },
  /**
   * @param {String} workoutId
   */
  findOne(workoutId) {
    return WorkoutModel.findOne({ workoutId }, projection);
  },
  /**
   *
   * @param {String} userId
   */
  findForUser(userId) {
    return WorkoutModel.find({ userId }, projection).then(
      result => result || []
    );
  },
  /**
   *
   * @param {String} userId
   * @param {Number} dateTime
   * @param {String} gymId
   * @param {String} otherDetails
   * @param {WorkoutStep[]} workoutSteps
   */
  create(userId, dateTime, gymId, otherDetails, workoutSteps) {
    workoutSteps.forEach(step => {
      //@ts-ignore
      step.stepId = mongoose.Types.ObjectId();
    });

    const workout = new WorkoutModel({
      workoutId: mongoose.Types.ObjectId(),
      userId,
      dateTime,
      gymId,
      workoutSteps,
      otherDetails
    });

    return workout.save();
  },
  /**
   * @param {String} workoutId
   * @param {Object} details
   */
  update(workoutId, details) {
    return WorkoutModel.update({ workoutId }, details).then(() =>
      this.findOne(workoutId)
    );
  },
  /**
   * @param {String} workoutId
   */
  delete(workoutId) {
    return WorkoutModel.deleteOne({ workoutId });
  }
};

module.exports = Workout;
