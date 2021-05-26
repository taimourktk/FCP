const Safepay = require("safepay");
const catchAsync = require("../utils/catchAsync");

const config = {
    environment: "sandbox",
    sandbox: {
        baseUrl: "https://sandbox.api.getsafepay.com",
        apiKey: "sec_e5dd3b9f-48f4-46d7-a484-0a1502b41576",
        apiSecret: "20b883bd5453c419f15951579f963af4b4678425502da1311a14927018487bec"
    },
    production: {
        baseUrl: "https://api.getsafepay.com",
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET
    }
}

const sfpy = new Safepay(config)

exports.createTransaction = catchAsync(async function(req, res, next) {

    const { amount, source } = req.query;

    console.log(">>", amount, source);

    const transaction = await sfpy.payments.create({
        amount: 1000,
        currency: "PKR",
    }).then((response) => {
        return response.data
    }).then((data) => {
        return sfpy.checkout.create({
            tracker: data.data.token,
            orderId: Date.now(),
            source: source || "mobile",
            cancelUrl: "https://example.com/payment-cancelled",
            redirectUrl: "https://example.com/payment-complete"
        })
    });
    res.send(transaction);
});