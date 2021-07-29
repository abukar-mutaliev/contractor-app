const { Schema, model } = require("mongoose");

const objectSchema = new Schema(
  {
    objectName: {
      type: String,
      required: true,
      unique: true
    },
    objectAddress: {
      type: String,
      required: true,
    },
    objectDescription: {
      type: String,
      required: true,
    },
    report: {
      ref: 'Report',
      type: Schema.Types.ObjectId
    },
    pathToImage: { type: String },
  },
  { timestamps: true }
);

const Object = model("Object", objectSchema);
module.exports = Object;