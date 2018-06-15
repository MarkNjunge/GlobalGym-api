//@ts-check
/**
 * @typedef {Object} Cords
 * @property {Number} lat
 * @property {Number} lng
 */
const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema(
  {
    gymId: { type: String, required: true },
    name: { type: String, required: true },
    logo: { type: String, required: true },
    images: [{ type: String, default: [] }],
    phone: { type: String, required: true },
    website: { type: String, required: true },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    cords: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    instructors: [{ type: String, default: [] }]
  },
  { collection: "gyms_91372" }
);

const GymModel = mongoose.model("gyms_91372", GymSchema);

const projection = { _id: 0, __v: 0 };

const Gym = {
  findAll(conditions) {
    if (!conditions) {
      conditions = {};
    }
    return GymModel.find(conditions, projection).then(result => result || []);
  },
  /**
   * @param {String} gymId
   */
  findOne(gymId) {
    return GymModel.findOne({ gymId }, projection);
  },
  /**
   * @param {Array} gymIds
   */
  findAllIn(gymIds) {
    return GymModel.find({ gymId: { $in: gymIds } }, projection);
  },
  /**
   *
   * @param {String} name
   * @param {String} logo
   * @param {String} phone
   * @param {String} website
   * @param {String} openTime
   * @param {String} closeTime
   * @param {String} country
   * @param {String} city
   * @param {Cords} cords
   */
  create(
    name,
    logo,
    phone,
    website,
    openTime,
    closeTime,
    country,
    city,
    cords
  ) {
    const gym = new GymModel({
      gymId: mongoose.Types.ObjectId(),
      name,
      logo,
      phone,
      website,
      openTime,
      closeTime,
      country,
      city,
      cords
    });

    return gym.save();
  },
  /**
   * @param {String} gymId
   * @param {Object} details
   */
  update(gymId, details) {
    return GymModel.update({ gymId }, details).then(() => this.findOne(gymId));
  },
  /**
   *
   * @param {String} gymId
   * @param {String} imageUrl
   */
  addImage(gymId, imageUrl) {
    return GymModel.update({ gymId }, { $push: { images: imageUrl } }).then(
      () => this.findOne(gymId)
    );
  },
  /**
   *
   * @param {String} gymId
   * @param {String} imageUrl
   */
  removeImage(gymId, imageUrl) {
    return GymModel.update(
      { gymId },
      { $pullAll: { images: [imageUrl] } }
    ).then(() => this.findOne(gymId));
  },
  /**
   *
   * @param {String} gymId
   * @param {String} instructorId
   */
  addInstructor(gymId, instructorId) {
    return GymModel.update(
      { gymId },
      { $push: { instructors: instructorId } }
    ).then(() => this.findOne(gymId));
  },
  /**
   *
   * @param {String} gymId
   * @param {String} instructorId
   */
  removeInstructor(gymId, instructorId) {
    return GymModel.update(
      { gymId },
      { $pullAll: { instructors: [instructorId] } }
    ).then(() => this.findOne(gymId));
  },
  /**
   * @param {String} gymId
   */
  delete(gymId) {
    return GymModel.deleteOne({ gymId });
  }
};

module.exports = Gym;
