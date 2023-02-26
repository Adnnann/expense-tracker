import mongoose from "mongoose";

const ExchangeRatesSchema = new mongoose.Schema({
    EUR: Number,
    USD: Number,
    updated: Date
});

mongoose.set('strictQuery', true)
export default mongoose.model("ExchangeRates", ExchangeRatesSchema);
