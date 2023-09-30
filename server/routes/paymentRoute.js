import express from 'express';
import { createOrder, verifyOrder } from '../controllers/paymentController.js';

const router = express.Router();

//best practice is to use authentication middleware as on these routes as we are sending key_id to front end.
router.post('/createorder', createOrder);
router.post('/verifyorder', verifyOrder);

export default router;