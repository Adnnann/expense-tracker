import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import User from '../models/user.model'
import config from '../config/config'

const signin = (req, res) => {

    console.log(req.body)
    User.findOne({'email': req.body.email},(err, user) => {
        if(err || !user){
            return res.send({error: req.cookies})
        }
        if(!user.authenticate(req.body.password)){
            return res.send({error: 'Email and password do not match'})
        }
        const token = jwt.sign({_id: user._id, email:user.email, name:user.name}, config.secret)
        res.cookie('userJwtToken', token, {expire: new Date()+999, httpOnly:true})
        res.send({
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

const signout = (req, res) => {
    res.clearCookie('userJwtToken')
    res.send({message:'User signed out'})
}



const requireSignin = expressjwt({
    secret:config.secret,
    algorithms:['HS256'],
    userProperty: 'auth',
})


export default {signin, signout }

