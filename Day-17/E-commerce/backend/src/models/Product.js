import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['shirts', 'jackets', 'pants', 'shoes', 'accessories']
  },
  sizes: [{
    type: String
  }],
  stock: {
    type: Number,
    default: 50,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
