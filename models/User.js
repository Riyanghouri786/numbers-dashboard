// models/User.js

import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
      default: Date.now,
    },
    ip: {
      type: String,
      default: 'Unknown',
    },
    userAgent: {
      type: String,
      default: 'Unknown',
    },
    deviceName: {
      type: String,
      default: 'Unknown',
    },
    os: {
      type: String,
      default: 'Unknown',
    },
    browser: {
      type: String,
      default: 'Unknown',
    },
    connectionType: {
      type: String,
      default: 'Unknown',
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },

    loginHistory: {
      type: [loginSchema],
      default: [],
    },

    refreshToken: {
      type: String,
      default: '',
    },

    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Avoid model overwrite error in development
export default mongoose.models.User || mongoose.model('User', userSchema);
