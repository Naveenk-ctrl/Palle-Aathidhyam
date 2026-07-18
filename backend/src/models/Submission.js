import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['contact', 'reservation', 'feedback'],
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, trim: true },
    review: { type: String, trim: true },
    rating: { type: Number, min: 0, max: 5 },
    guests: { type: Number, min: 1 },
    date: { type: String, trim: true },
    time: { type: String, trim: true },
    occasion: { type: String, trim: true },
    requests: { type: String, trim: true },
    status: {
      type: String,
      enum: ['new', 'viewed', 'replied', 'closed'],
      default: 'new',
    },
    adminReply: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Submission = mongoose.model('Submission', submissionSchema);
