//@ts-check
/**
 * @typedef {Object} SessionStep
 * @property {Number} stepIndex
 * @property {String} reps
 * @property {Number} sets
 * @property {String} description
 */
const mongoose = require("mongoose");

const SessionStepSchema = new mongoose.Schema({
  stepId: { type: String, required: true },
  stepIndex: { type: Number, required: true },
  reps: { type: String, required: true },
  sets: { type: Number, required: true },
  title: { type: String, required: true }
});

const SessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    userId: { type: String, required: true },
    sessionName: { type: String, required: true },
    dateTime: { type: Number, required: true },
    gymId: { type: String, required: true },
    sessionSteps: [SessionStepSchema],
    completed: { type: Boolean, required: true, default: false }
  },
  { collection: "session_91372" }
);

const SessionModel = mongoose.model("session_91372", SessionSchema);

const projection = { _id: 0, __v: 0, "sessionSteps._id": 0 };

const Session = {
  findAll() {
    return SessionModel.find({}, projection).then(result => result || []);
  },
  /**
   * @param {String} sessionId
   */
  findOne(sessionId) {
    return SessionModel.findOne({ sessionId }, projection);
  },
  /**
   *
   * @param {String} userId
   */
  findForUser(userId) {
    return SessionModel.find({ userId }, projection).then(
      result => result || []
    );
  },
  /**
   *
   * @param {String} userId
   * @param {Number} dateTime
   * @param {String} gymId
   * @param {String} otherDetails
   * @param {SessionStep[]} sessionSteps
   */
  create(userId, sessionName, dateTime, gymId, sessionSteps) {
    sessionSteps.forEach(step => {
      //@ts-ignore
      step.stepId = mongoose.Types.ObjectId();
    });

    const session = new SessionModel({
      sessionId: mongoose.Types.ObjectId(),
      userId,
      sessionName,
      dateTime,
      gymId,
      sessionSteps
    });

    return session.save();
  },
  /**
   * @param {String} sessionId
   * @param {Object} details
   */
  update(sessionId, details) {
    return SessionModel.update({ sessionId }, details).then(() =>
      this.findOne(sessionId)
    );
  },
  /**
   * @param {String} sessionId
   */
  delete(sessionId) {
    return SessionModel.deleteOne({ sessionId });
  }
};

module.exports = Session;
