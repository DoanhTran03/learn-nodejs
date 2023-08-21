const Joi = require("joi");
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 10,
      required: true,
    },
    phone: { type: String, minlength: 3, maxlength: 15, required: true },
    isGold: { type: Boolean, required: true },
  });
  
  const Customer = mongoose.model("customer", CustomerSchema);

  const validateCustomer = (customer) => {
    const schema = {
      name: Joi.string().min(3).max(10).required(),
      phone: Joi.string().min(3).max(15).required(),
      isGold: Joi.boolean().required(),
    };
    return Joi.validate(customer,schema);
  };

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;