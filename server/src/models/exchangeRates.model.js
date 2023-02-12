import mongoose from "mongoose";
const ExchangeRatesSchema = new mongoose.Schema({
    EUR: Number,
    USD: Number,
    updated: Date
});

export default mongoose.model("ExchangeRates", ExchangeRatesSchema);
