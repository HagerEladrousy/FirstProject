import express from 'express'

import { signup } from '../controllers/doc.js'

const router = express.Router()

router.post('/signup', signup)
// router.post('/med', addMid)

export default router
