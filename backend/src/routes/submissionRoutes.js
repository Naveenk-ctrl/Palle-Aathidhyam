import { Router } from 'express';
import { createContact, createFeedback, createReservation } from '../controllers/submissionController.js';

const router = Router();

router.post('/contact', createContact);
router.post('/reservation', createReservation);
router.post('/feedback', createFeedback);

export default router;
