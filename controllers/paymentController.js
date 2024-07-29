const Payment = require("../models/paymentModel");

exports.addPaymentMethod = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res
      .status(201)
      .json({ message: "Payment method added successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserPaymentMethods = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.userId });
    res.status(200).json({
      message: "Payment methods fetched successfully",
      payments: payments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    res.status(200).json({
      message: "Payment method updated successfully",
      payment: payment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deletePaymentMethod = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    res.status(200).json({ message: "Payment method deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
