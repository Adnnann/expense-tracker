import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import User from '../models/user.model'
import config from '../config/config'
import errorHandler from './helpers/dbErrorHandlers'

const signIn = (req, res) => {
    User.findOne({email: req.body.email},(err, user) => {
        if(err || !user){
            return res.status(400).json('User not found')
        }
        if(!user.authenticate(req.body.password)){
            return res.status(401).json('Email and password do not match')
        }

        const token = jwt.sign({_id: user._id, email:user.email, name:user.name}, config.secret)
        res.cookie('userJwtToken', token, {expire: new Date()+999, httpOnly:true})
        return res.status(200).json({
            token,
            user: {
                _id:user._id, 
                firstName: user.firstName, 
                lastName: user.lastName,
                email: user.email
            }
        })

    })
}

const signUpGoogleUser = (req, res) => {
    User.findOne({'email': req.body.email},(err, user) => {
        if(!user){
        const user = new User(req.body)
        user.save((err, user) => {
            if(err) {
                return res.status(400).json({error: errorHandler.getErrorMessage(err)})
            }else{
            const token = jwt.sign({_id: user._id, email:user.email, name:user.name}, config.secret)
            res.cookie('userJwtToken', token, {expire: new Date()+999, httpOnly:true})
            return res.status(200).json({
                token,
                user: {
                    _id:user._id, 
                    firstName: user.firstName, 
                    lastName: user.lastName,
                    email: user.email
                }
            })
            }
        })
    
    }else{
        const token = jwt.sign({_id: user._id, email:user.email, name:user.name}, config.secret)
        res.cookie('userJwtToken', token, {expire: new Date()+999, httpOnly:true})
        return res.status(200).json({
            token,
            user: {
                _id:user._id, 
                firstName: user.firstName, 
                lastName: user.lastName,
                nickname: user.nickname, 
                email: user.email
            }
        })
    }

    })
}


const signOut = (req, res) => {
    res.clearCookie('userJwtToken')
    res.status(200).json('User signed out')
}



const requireSignin = expressjwt({
    secret:config.secret,
    algorithms:['HS256'],
    userProperty: 'auth',
})


export default {signIn, signOut, signUpGoogleUser }

