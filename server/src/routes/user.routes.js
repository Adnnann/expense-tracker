import express from 'express'
import userCtrl from '../controllers/user.controller'
import passport from 'passport'
import '../middleware/passport'

const router = express.Router()

router.get('/protected', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        if(req.cookies.userJwtToken){
            return res.status(200).json(req.cookies.userJwtToken)
        }
    }
)

router.route('/api/users/')
.get(userCtrl.read)
.post(userCtrl.create)

router.route('/api/users/:userId')
.put(userCtrl.update)
.delete(userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router