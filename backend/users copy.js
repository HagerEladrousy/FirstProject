import express from 'express'

import {
  signup,
  addMed,
  addFastingBlood,
  addCumulativeBlood,
} from '../controllers/user.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/med', addMed)
router.post('/addFastingBlood', addFastingBlood)
router.post('/addCumulativeBlood', addCumulativeBlood)

export default router
