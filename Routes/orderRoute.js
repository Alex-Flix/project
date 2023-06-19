const express = require("express");

const dataSchema = require("./../Middlewares/validation/orderValidator");
const validator = require("./../Middlewares/validation/validate");
const controller = require("./../Controllers/orderController");
const { authorization } = require("../Middlewares/auth");
const router = express.Router();
const { checks } = require("../Middlewares/services/addedOrderValidatorMW");

router
  //User Tasks
  .route("/user/order")
  .get(controller.getAllUserOrders)
  .post(dataSchema.addNewOrder, validator, checks, controller.addNewOrder)
  .delete(dataSchema.deleteOrder, validator, controller.deleteOrderById)
  .patch(dataSchema.updateOrder, validator, controller.updateOrderById);

//Admin Tasks
router.get("/admin/order/", authorization, controller.adminGetAllOrders);

router
  .route("/admin/order/:_id")
  .all(authorization)
  .get(dataSchema.paramMongoIdCheck, validator, controller.adminGetOrderById)
  .patch(
    dataSchema.paramMongoIdCheck,
    validator,
    controller.adminUpdateOrderById
  )
  .delete(
    dataSchema.paramMongoIdCheck,
    validator,
    controller.adminDeleteOrderById
  );

module.exports = router;
