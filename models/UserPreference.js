import mongoose from "mongoose";

const UserPreferenceSchema = new mongoose.Schema({
  user_id: { type: String, unique: true, required: true },
  word_count: { type: Number, default: 5 },
  preferred_language: { type: String, default: "en" }
});

export default mongoose.models.UserPreference || mongoose.model("UserPreference", UserPreferenceSchema);
