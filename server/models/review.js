import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 50 characters long'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)



export default mongoose.model('Review', schema)
