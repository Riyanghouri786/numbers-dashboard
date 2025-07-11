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
      enum: ["valid"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Number_2 || mongoose.model('Number_2', numberSchema);
