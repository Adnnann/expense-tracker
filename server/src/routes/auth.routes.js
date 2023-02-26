import express from "express";
import authCtrl from '../controllers/auth.controller'

const router = express.Router()



router.route('/auth/signin')
.post(authCtrl.signIn)

router.route('/auth/google')
.post(authCtrl.signUpGoogleUser)

router.route('/auth/signout')
.post(authCtrl.signOut)

export default router;