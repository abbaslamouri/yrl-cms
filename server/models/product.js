import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product Name is required'],
      maxlength: [50, 'Name cannot be more than 100 characters long'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    customSlug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      maxlength: [2000, 'Name cannot be more than 2000 characters long'],
    },
    excerpt: {
      type: String,
      maxlength: [2000, 'Name cannot be more than 2000 characters long'],
    },
    active: {
      type: Boolean,
      default: True,
    },
    featuredImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    gallery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
    type: {
      type: String,
    },
    virtual: {
      type: Boolean,
      default: false,
    },
    downloadable: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
    },
    salePrice: {
      type: Number,
    },
    taxStatus: {
      type: String,
      enum: ['taxable', 'shippingOnly', 'none'],
    },
    taxClass: {
      type: String,
      enum: ['standard', 'reducedRate', 'zero'],
    },
    sku: {
      type: String,
    },
    manageInventory: {
      type: Boolean,
      default: false,
    },
    stockQty: {
      type: Number,
      default: 0,
    },
    allowBackOrder: {
      type: String,
      enum: ['yes', 'no', 'notify'],
    },
    lowStockThreshold: {
      type: Number,
    },
    shipping: {
      weight: String,
      dimensions: {
        length: String,
        width: String,
        height: String,
      },
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: [true, 'Product Category is required'],
      },
    ],
    attributes: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' },
        // required: [true, 'Product Category is required'],
        terms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attributeterm' }],
        // required: [true, 'Product Category is required'],
        defaultTerm: { type: mongoose.Schema.Types.ObjectId, ref: 'Attributeterm' },
      },
    ],
    soldQty: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        rating: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Review author is required'] },
      },
    ],
    ReviewsCount: {
      type: Number,
      default: 0,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Product author is required'] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.index({ name: 'text', slug: 'text' });

schema.virtual('averageRating').get(function () {
  if (!this.ratings) return;
  const ratingsArr = this.ratings.map((el) => el.rating);
  // console.log('ZZZZZZZZZ', ratingsArr)
  return ratingsArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.ratings.length;
});

// Document Middleware, runs before save() and create()
// schema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true })
//   this.path = `/${this.slug}`
//   next()
// })

export default mongoose.model('Product', schema);
