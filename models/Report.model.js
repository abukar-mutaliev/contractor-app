const { Schema, model } = require("mongoose");

const reportSchema = new Schema(
  {
    report: { type: String, required: true },
    object: {
      ref: "Object",
      type: Schema.Types.ObjectId,
      required: true
    },
      status: {
      ref: "Status",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);
const Report = model("Report", reportSchema);
module.exports = Report;
