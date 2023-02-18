import express from 'express'
import transactionCtrl from '../controllers/transaction.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/transaction')
.post(transactionCtrl.createTransaction)
.get(transactionCtrl.getTransactions)

router.route('/api/transaction/:transactionId')
.get(authCtrl.hasAuthorization, transactionCtrl.getTransaction)
.put(authCtrl.hasAuthorization, transactionCtrl.updateTransaction)
.delete(authCtrl.hasAuthorization, transactionCtrl.removeTransaction)

router.param('transactionId', transactionCtrl.transactionByID)

export default router