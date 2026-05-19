import { model, Schema } from "mongoose";
import { TAGS } from "../constans/tags.js";

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    default: "",
    trim: true,
  },
  tag: {
    type: String,
    default: "Todo",
    enum: TAGS,
  },
}, {
  timestamps: true,
});

noteSchema.index({ title: "text", content: "text", tag: 1 });

export const Note = model("Note", noteSchema);
