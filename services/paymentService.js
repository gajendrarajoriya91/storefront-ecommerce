const axios = require("axios");

const processPayment = async (amount, currency, paymentMethod, user) => {
  try {
    const response = await axios.post(
      "https://payment-gateway.example.com/charge",
      {
        amount,
        currency,
        paymentMethod,
        userId: user._id,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
        },
      }
    );

    if (response.data.success) {
      return {
        message: "Payment processed successfully",
        transactionId: response.data.transactionId,
      };
    } else {
      throw new Error(response.data.message || "Payment failed");
    }
  } catch (error) {
    throw new Error(`Payment error: ${error.message}`);
  }
};

const refundPayment = async (transactionId) => {
  try {
    const response = await axios.post(
      "https://payment-gateway.example.com/refund",
      {
        transactionId,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
        },
      }
    );

    if (response.data.success) {
      return { message: "Refund processed successfully" };
    } else {
      throw new Error(response.data.message || "Refund failed");
    }
  } catch (error) {
    throw new Error(`Refund error: ${error.message}`);
  }
};

module.exports = {
  processPayment,
  refundPayment,
};
