const { model } = require("mongoose");

const Order = model("orders");
const Product = model("products");

module.exports = async (req, res, next) => {
  const { _id: user_id } = req.user;
  try {
    const data = await Order.find({ user_id }, { products: 1 });
    if (!data.length) return next();
    for (const { products, _id } of data) {
      for (const item of products) {
        await Product.updateOne(
          { _id: item._id },
          { $inc: { available: item.quantity } }
        );
      }
      await Order.deleteOne({ _id });
    }
    next();
  } catch (error) {
    next(error);
  }
};




