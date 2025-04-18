import express from 'express'

import { 
    signup,
    signin
 } from '../controllers/doc.js'

const router = express.Router()

router.post('/signup', signup)
// router.post('/med', addMid)
router.post('/signin', signin)

export default router
