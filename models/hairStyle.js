const mongoose = require('mongoose');
const { Schema } = mongoose;

const hairStyleSchema = new Schema({
  name: String,
  description: String,
  category: String,
  imageUrl: String,
  imageId: String,
  price: Number,
  time: String,
  createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
}, { collation: { locale: 'en_US', strength: 1 }, timestamps: true });

hairStyleSchema.index({name: 1})
mongoose.model("hairStyles",hairStyleSchema)