const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  origin: {
    type: Array,
    default: undefined
  },
  destination: {
    type: Array,
    default: undefined
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Trip = mongoose.model("trips", TripSchema)