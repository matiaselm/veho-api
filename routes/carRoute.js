'use strict';
import express from 'express';
import carController from '../controllers/carController.js';

const router = express.Router();
router.route('/')
  .post(carController.create)
  .get(carController.getAll)

router.route('/:id')
  .get(carController.getOne)
  .put(carController.modify)
  .delete(carController.delete);

export default router;