import Transaction from '../models/transactions.model'
import _ from 'lodash'
import dbErrorHandlers from './helpers/dbErrorHandlers'
import jwtDecode from 'jwt-decode'

const createTransaction = (req, res) => {

    const transaction = new Transaction(req.body) 
    transaction.save((err)=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        return res.send({message: 'Transaction successfuly created'})
    })
}
const getTransactions = (req, res) => {
    // get id to enable filtering of data
    const userId = jwtDecode(req.cookies.userJwtToken)._id
    //filter data - get transactions for last three days
    Transaction.find({})
    .where('userId').equals(userId)
    //sort data in descinding order
    .sort({"created":-1})
    .exec((err, transactions) => {
        if(err){
            return res.send({error:dbErrorHandlers.getErrorMessage(err)})
        }
        res.send({transactions:transactions})
    })
}

const getTransaction =  (req, res) => {
    res.status(200).json(req.profile)
}
const updateTransaction = (req, res, next) => {

    let transaction = req.profile
    transaction = _.extend(transaction, req.body);

    transaction.updated = Date.now()
    transaction.save(err=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        res.send({message: 'Data updated'})
    })
}

const removeTransaction = (req, res, next) => {
    let transaction = req.profile
    transaction.remove((err)=>{
        if(err){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
        res.send({message:'Transaction deleted'})
    })
}
  

const transactionByID = (req, res, next, id) => {
    Transaction.findById(id).exec((err, transaction) => {
        if(err || !transaction){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
    req.profile = transaction;
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
