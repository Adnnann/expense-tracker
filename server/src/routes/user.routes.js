import express from 'express'
import userCtrl from '../controllers/user.controller'
import passport from 'passport'
import authCtrl from '../controllers/auth.controller'
require('../middleware/passport')

const router = express.Router()

router.get('/protected', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        if(req.cookies.userJwtToken){
            res.send(
               JSON.stringify({message: req.cookies.userJwtToken})
            )
        }
    }
)

router.route('/api/users/')
.get(userCtrl.read)
.post(userCtrl.create)

router.route('/api/users/:userId')
.put(userCtrl.update)
.delete(userCtrl.remove)

router.route('/api/users/relogin')
.post(userCtrl.reloginUser)


router.param('userId', userCtrl.userByID)

export default router