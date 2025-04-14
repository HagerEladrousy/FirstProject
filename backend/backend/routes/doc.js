import express from 'express'

import { 
    signup,
    signin,
    sendMessage,
    getMessages
 } from '../controllers/doc.js'

const router = express.Router()

router.post('/signup', signup)
// router.post('/med', addMid)
router.post('/signin', signin)

// إرسال رسالة
router.post('/send', sendMessage);

// عرض الرسائل
router.get('/messages', getMessages);


export default router
