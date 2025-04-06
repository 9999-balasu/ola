

/*import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  userEmail: String,
  pickup: String,
  drop: String,
  vehicle: String,
  status: { type: String, default: "Pending" },
}, { timestamps: true });

export default mongoose.models.Ride || mongoose.model("Ride", rideSchema);*/





// models/Ride.ts
import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    userEmail: String,
    pickup: String,
    drop: String,
    vehicle: String,
    status: { type: String, default: "Pending" },
    currentLocation: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ride || mongoose.model("Ride", rideSchema);

