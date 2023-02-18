import ExchangeRates from "../models/exchangeRates.model"

const getExchangeRates = async (req, res) => {
     ExchangeRates
    .find({})
    .sort({updated: -1})
    .limit(1)
    .exec((err, exchangeRates) => {
        if(err){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }else{
            return res.send({exchangeRates:exchangeRates})
        }
    })
}


const setExchangeRates = async (req, res) => {
  
        const { rates } = req.body

        console.log(rates)

        const exchangeRates = new ExchangeRates({
            updated: Date.now()
        })

        exchangeRates.EUR = Number(rates.EUR)
        exchangeRates.USD = Number(rates.USD)

        exchangeRates.save((err, result) => {
            if(err) {
                return res.send({error: errorHandler.getErrorMessage(err)})
            }else{
                return res.send({
                    message: 'Successfully added rates.', 
                    exchangeRates: result})
            }
        }
    )
       

}

export default {
    getExchangeRates,
    setExchangeRates,
}