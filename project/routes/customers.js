const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

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

router.get("/", async (req, res) => {
  const customers = await Customer.find({}).sort({ name: 1 }).lean();
  res.send(customers);
});

router.post('/', async (req,res) => {
    console.log('Hello');
    const {error} = validateCustomer(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const customer = new Customer(req.body);
    const result = await customer.save();
    res.send(result);
})

router.put('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.send('The customer with specified ID is not available');

    const {error} = validateCustomer(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    customer.name = req.body.name;
    customer.phone= req.body.phone;
    customer.isGold = req.body.isGold;

    const result =  await customer.save();
    res.send(result);
})

router.delete('/:id', async (req, res) => {
    const result = await Customer.findByIdAndRemove(req.params.id);
    if (!result) res.status(404).send('The customer with specified ID is not available');
    res.send(result);
})

const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(3).max(10).required(),
    phone: Joi.string().min(3).max(15).required(),
    isGold: Joi.boolean().required(),
  };
  return Joi.validate(customer,schema);
};
module.exports = router;
