//@ts-check
const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema(
  {
    instructorId: { type: String, required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    email: { type: String, required: true },
    yearOfBirth: { type: Number, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true, enum: ["M", "F"] },
    country: { type: String, required: true }
  },
  { collection: "instructors_91372" }
);

const InstructorModel = mongoose.model("instructors_91372", InstructorSchema);

const projection = { _id: 0, __v: 0 };

const Instructor = {
  findAll() {
    return InstructorModel.find({}, projection);
  },
  /**
   * @param {String} instructorId
   */
  findOne(instructorId) {
    return InstructorModel.findOne({ instructorId }, projection);
  },
  /**
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} profilePhoto
   * @param {String} email
   * @param {Number} yearOfBirth
   * @param {String} phone
   * @param {String} gender M or F
   * @param {String} country
   */
  register(
    firstName,
    lastName,
    profilePhoto,
    email,
    yearOfBirth,
    phone,
    gender,
    country
  ) {
    const instructor = new InstructorModel({
      instructorId: mongoose.Types.ObjectId(),
      firstName,
      lastName,
      profilePhoto,
      email,
      yearOfBirth,
      phone,
      gender,
      country
    });

    return instructor.save();
  },
  /**
   * @param {String} instructorId
   * @param {Object} details
   */
  update(instructorId, details) {
    return InstructorModel.updateOne({ instructorId }, details).then(() =>
      this.findOne(instructorId)
    );
  },
  /**
   * @param {String} instructorId
   */
  delete(instructorId) {
    return InstructorModel.deleteOne({ instructorId });
  }
};

module.exports = Instructor;
