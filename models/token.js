const mongoose = require("mongoose");
const { Schema } = mongoose;
const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },

    token: String,

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 43200,
    },
  },
  { timestamps: true }
);

tokenSchema.index({ userId: 1 });
tokenSchema.index({ token: 1 });

mongoose.model("tokens", tokenSchema);
