import mongoose from "mongoose";

const exchangeRateSchema = new mongoose.Schema({
  result: String,
  documentation: String,
  terms_of_use: String,
  time_last_update_unix: Number,
  time_last_update_utc: String,
  time_next_update_unix: Number,
  time_next_update_utc: String,
  base_code: String,
  conversion_rates: { type: Map, of: Number },
});

export default mongoose.models.ExchangeRate ||
  mongoose.model("ExchangeRate", exchangeRateSchema);
