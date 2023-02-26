import User from '../models/user.model'
import {extend} from 'lodash'
import errorHandler from './helpers/dbErrorHandlers'
import jwtDecode from 'jwt-decode'

  const create = (req, res, next) => {

    const user = new User(req.body)
    user.save((err, result) => {
        if(err) {
            res.status(400).json(errorHandler.getErrorMessage(err))
        }else{
            res.status(200).json('Successfuly created a new user.')
        }
    })
}

const read = (req, res) => {

    const token = req.cookies.userJwtToken
    const id = jwtDecode(token)._id
 
    User.findById(id, (err, user) => {
        if(err || !user){
        return res.status(400).json('User not found')
        }
        user.hashed_password = undefined
        user.salt = undefined
    return res.status(200).json(user)
    })
}

const update = (req, res, next) => {
    let user = req.profile
    user = extend(user, req.body);

    user.updated = Date.now()
    user.save(err=>{
         
        if(err){
            return res.status(400).json(errorHandler.getErrorMessage(err))
        }
        return res.status(200).json({message: 'Data updated', user: user})
    })
}

const remove = (req, res, next) => {
    let user = req.profile
       user.remove((err)=>{
        if(err){
            return res.status(400).json(errorHandler.getErrorMessage(err))
        }
        return res.status(200).json('Account closed')
    })
}
            
const userByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json('User not found!')
        }
    req.profile = user;
    next()
    })
}


export default {
    create,
    read, 
    update,
    remove,
    userByID
}