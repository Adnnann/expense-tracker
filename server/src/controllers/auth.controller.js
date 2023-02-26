import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import User from '../models/user.model'
import config from '../config/config'
import errorHandler from './helpers/dbErrorHandlers'

const signIn = (req, res) => {
    User.findOne({'email': req.body.email},(err, user) => {
        if(err || !user){
            const user = new User(req.body)
            user.save((err, result) => {
                if(err) {
                    return res.status(400).json({error: 'Unable to create a new user.'})
                }else{
                    return res.status(400).json({message: 'Successfully created a new user.'})
                }
            })
        }

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
    res.send({message:'User signed out'})
}



const requireSignin = expressjwt({
    secret:config.secret,
    algorithms:['HS256'],
    userProperty: 'auth',
})


export default {signIn, signOut, signUpGoogleUser }

