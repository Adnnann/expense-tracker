import exchangeRatesController from "../controllers/exchangeRates.controller";
import { Router } from "express";

const router = Router();

router.route("/api/exchangeRates")
.post(exchangeRatesController.setExchangeRates);

export default router;