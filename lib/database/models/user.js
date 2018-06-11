//@ts-check
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    phone: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    yearOfBirth: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["M", "F"] },
    country: { type: String, required: true },
    preferredGym: { type: String, required: false },
    weight: { type: Number, required: true },
    targetWeight: { type: Number, required: true }
  },
  { collection: "users_91372" }
);

const UserModel = mongoose.model("users_91372", UserSchema);

const projection = { _id: 0, __v: 0 };

const User = {
  findAll() {
    return UserModel.find({}, projection).then(result => result || []);
  },
  /**
   * @param {String} userId
   */
  findOne(userId) {
    return UserModel.findOne({ userId }, projection);
  },
  /**
   *
   * @param {String} userId
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} email
   * @param {String} phone
   * @param {String} profilePhoto
   * @param {Number} yearOfBirth
   * @param {String} gender M or F
   * @param {String} country
   * @param {Number} weight
   * @param {Number} targetWeight
   */
  register(
    userId,
    firstName,
    lastName,
    email,
    phone,
    profilePhoto,
    yearOfBirth,
    gender,
    country,
    weight,
    targetWeight
  ) {
    const user = new UserModel({
      userId,
      firstName,
      lastName,
      email,
      phone,
      profilePhoto,
      yearOfBirth,
      gender,
      country,
      weight,
      targetWeight
    });

    return user.save();
  },
  /**
   * @param {String} userId
   * @param {Object} details
   */
  update(userId, details) {
    return UserModel.update({ userId }, details).then(() =>
      this.findOne(userId)
    );
  },
  /**
   * @param {String} userId
   */
  delete(userId) {
    return UserModel.deleteOne({ userId });
  }
};

module.exports = User;
