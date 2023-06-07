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
  .route("/admin/order/:id")
  .all(authorization)
  .get(dataSchema.paramIntegerCheck, validator, controller.adminGetOrderById)
  .patch(
    dataSchema.paramIntegerCheck,
    validator,
    controller.adminUpdateOrderById
  )
  .delete(
    dataSchema.paramIntegerCheck,
    validator,
    controller.adminDeleteOrderById
  );

// router
//   .route("/user/:id/order")
//   .delete(
//     dataSchema.paramIntegerCheck,
//     validator,
//     controller.adminDeleteAllUserOrders
//   );

module.exports = router;
