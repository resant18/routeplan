const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({  
  name: {
    type: String,
    required: true
  },
  placeId: {
      type: Number,
      required: true
  },
  lat: {
    type: Double,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
  desc: {
    type: String
  }, 
  trips: {
    type: Schema.Types.ObjectId,
    ref: "trips"
  }, 
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tweet = mongoose.model("places", PlaceSchema);
