'use strict';
import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();
router.route('/')
  .post(orderController.create)
  .get(orderController.getAll)

router.route('/:id')
  .get(orderController.getOne)
  .put(orderController.modify)

export default router;