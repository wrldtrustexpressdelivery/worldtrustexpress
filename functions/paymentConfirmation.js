// functions/paymentConfirmation.js
const nodemailer = require("nodemailer");
const cors = require("cors")();
require("dotenv").config();

module.exports = async function (req, res) {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { tracking, method, amount, proofUrl } = req.body;

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const html = `
        <h2>New Shipment Payment</h2>
        <p><b>Tracking ID:</b> ${tracking}</p>
        <p><b>Method:</b> ${method}</p>
        <p><b>Amount:</b> $${amount}</p>
        <p><b>Proof:</b> <a href="${proofUrl}" target="_blank">View Receipt</a></p>
      `;

      await transporter.sendMail({
        from: `"World Trust Express" <${process.env.GMAIL_USER}>`,
        to: "wrldtrustexpress@proton.me",
        subject: `Payment Received - ${tracking}`,
        html,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("❌ Email error:", err);
      res.status(500).json({ error: "Failed to send email" });
    }
  });
};
