'use strict';
import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();
router.route('/')
  .post(userController.create)
  .get(userController.getAll)

router.route('/:id')
  .get(userController.getOne)
  .put(userController.update)
  .delete(userController.delete);

router.route('/:id/currentorder')
  .get(userController.getCurrentOrder)

router.route('/:id/orders')
  .get(userController.getOrders);

export default router;
