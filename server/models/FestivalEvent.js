import mongoose from "mongoose";

const festivalEventSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["arrival", "aarti", "cultural", "prasad", "visarjan", "other"],
    required: true
  },
  titleMr: { type: String, required: true },
  titleEn: { type: String, default: "" },
  time: { type: String, required: true },
  dateStr: { type: String, required: true },
  dayNumber: { type: Number, default: 1 },
  venue: { type: String, default: "मुख्य मंडप, म्हाडा टॉवर्स प्रांगण" },
  hostWing: { type: String, default: "सर्व विंग्ज (G, H, I, J, K)" },
  descriptionMr: { type: String, default: "" },
  descriptionEn: { type: String, default: "" },
  isHighlight: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["upcoming", "live", "completed"],
    default: "upcoming"
  },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

const FestivalEvent = mongoose.model("FestivalEvent", festivalEventSchema);
export default FestivalEvent;
