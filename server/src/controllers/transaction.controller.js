import Transaction from '../models/transactions.model'
import _ from 'lodash'
import dbErrorHandlers from './helpers/dbErrorHandlers'
import jwtDecode from 'jwt-decode'

const createTransaction = (req, res) => {

    if(req.body.amount < 1 || req.body.amount === ''){
        return res.status(400).json('Amount cannot be empty!')
    }

    const transaction = new Transaction(req.body) 

    transaction.userId = jwtDecode(req.cookies.userJwtToken)._id
    transaction.save((err)=>{
        if(err){
            return res.status(400).json(dbErrorHandlers.getErrorMessage(err))
        }
        return res.status(200).send({message: 'Transaction successfully created'})
    })
}
const getTransactions = (req, res) => {

    // get id to enable filtering of data
    const userId = jwtDecode(req.cookies.userJwtToken)._id
    //filter data - get transactions for last three days
    Transaction.find({})
    .where('userId')
    .equals(userId)
    //sort data in descending order
    .sort({"created":-1})
    .exec((err, transactions) => {
        if(err){
            return res.status(400).json(dbErrorHandlers.getErrorMessage(err))
        }
       return res.status(200).json({message:transactions})
    })
} 


const getTransaction =  (req, res) => {
    return res.status(200).json(req.profile)
}
const updateTransaction = (req, res, next) => {

    let transaction = req.transaction
    transaction = _.extend(transaction, req.body);

    transaction.updated = Date.now()
    transaction.save(err=>{
        if(err){
            return res.status(400).json(dbErrorHandlers.getErrorMessage(err))
        }
        return res.status(200).json('Data updated')
    })
}

const removeTransaction = (req, res, next) => {
    let transaction = req.profile
    transaction.remove((err)=>{
        if(err){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
        return res.send({message:'Transaction deleted'})
    })
}
  

const transactionByID = (req, res, next, id) => {
    Transaction.findById(id).exec((err, transaction) => {
        if(err || !transaction){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
    req.transaction = transaction;
    next()
    })
}

export default {
    createTransaction,
    getTransactions,
    updateTransaction,
    removeTransaction,
    getTransaction, 
    transactionByID
}
