// /lib/models/number.js
import mongoose from 'mongoose';

const numberSchema = new mongoose.Schema(
{
    number: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Send"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Send || mongoose.model('Send', numberSchema);
