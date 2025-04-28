import express from 'express'
import {
    sendRequest,
    getPendingRequests,
    respondToRequest,
    getApprovedConnections,
    getSentRequests,
    getApprovedDoctorsForUser
} from '../controllers/requestController.js'

const router = express.Router()

router.post('/send', sendRequest);
router.get('/pending/:doctorId', getPendingRequests);
router.post('/respond', respondToRequest);
router.get('/approved/:doctorId', getApprovedConnections);
router.get('/sent/:userId', getSentRequests);
router.get('/approved-for-user/:userId', getApprovedDoctorsForUser);



export default router;
