const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "users",
   },
   name: {
      type: String,
      required: true,
   },
   origin: {
      type: Object,      
      default: undefined,
   },
   destination: {
      type: Object,      
      default: undefined,
   },
   pois: {
      type: Object,
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = Trip = mongoose.model("trips", TripSchema)