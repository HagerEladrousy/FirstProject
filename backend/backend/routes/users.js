import express from 'express'
import {
  signup,
  signin,
  addMed,
  getMeds, 
  deleteMed,
  addFastingBlood,
  addCumulativeBlood,
  getLatestFasting,
  getLatestCumulative,
} from '../controllers/user.js'

const router = express.Router()

// Authentication Routes
router.post('/signup', signup)
router.post('/signin', signin)

// Data Routes
router.post('/med', addMed)
router.get('/meds', getMeds) 
router.delete('/med/:id', deleteMed)
router.post('/addFastingBlood', addFastingBlood)
router.get('/latestFasting', getLatestFasting)
router.get('/latestCumulative', getLatestCumulative)
router.post('/addCumulativeBlood', addCumulativeBlood)

export default router