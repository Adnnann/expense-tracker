import express from 'express'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet';
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import transactionRoutes from './routes/transaction.routes'
import exchangeRatesRoutes from './routes/exchangeRates.routes.js'
import passport from 'passport';
import cookieParser from 'cookie-parser'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(compress())
app.use(cors())
app.use(helmet())
app.use(passport.initialize())
app.use(cookieParser())

app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', transactionRoutes)
app.use('/', exchangeRatesRoutes)

app.use('*', (req, res) => {
    return res.send({error: 'Page not found'})
})

app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError'){
        return res.status(401).json({error: `${err.name} : ${err.message}`})
    }
})

export default app;