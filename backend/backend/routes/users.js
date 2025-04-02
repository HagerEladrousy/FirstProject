import express from 'express'
import {
  signup,
  signin,
  addMed,
  addFastingBlood,
  addCumulativeBlood,
} from '../controllers/user.js'

const router = express.Router()

// Authentication Routes
router.post('/signup', signup)
router.post('/signin', signin)

// Data Routes
router.post('/med', addMed)
router.post('/addFastingBlood', addFastingBlood)
router.post('/addCumulativeBlood', addCumulativeBlood)

export default router