// functions/newShipment.js
const nodemailer = require("nodemailer");
const cors = require("cors")();
require("dotenv").config();

module.exports = async function (req, res) {
  // Handle CORS preflight
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const {
        senderName,
        senderEmail,
        senderPhone,
        receiverName,
        receiverEmail,
        receiverPhone,
        current_location,
        destination,
        itemName,
        itemDescription,
        weight,
        images = [],
      } = req.body;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const htmlMessage = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:8px;background:#fafafa;">
          <h2 style="color:#2c3e50;">🚚 New Shipment Received</h2>
          <h3>👤 Sender</h3>
          <p><b>Name:</b> ${senderName}<br>
          <b>Email:</b> ${senderEmail}<br>
          <b>Phone:</b> ${senderPhone}</p>

          <h3>👤 Receiver</h3>
          <p><b>Name:</b> ${receiverName}<br>
          <b>Email:</b> ${receiverEmail}<br>
          <b>Phone:</b> ${receiverPhone}</p>

          <h3>📍 Locations</h3>
          <p><b>Current:</b> ${current_location}<br>
          <b>Destination:</b> ${destination}</p>

          <h3>📦 Package</h3>
          <p><b>Item Name:</b> ${itemName}<br>
          <b>Description:</b> ${itemDescription}<br>
          <b>Weight:</b> ${weight}</p>

          ${
            images.length
              ? `<h3>📎 Images</h3>
                 <div style="display:flex;gap:10px;flex-wrap:wrap;">
                   ${images
                     .map(
                       url =>
                         `<img src="${url}" alt="Shipment Image" style="width:120px;height:auto;border-radius:6px;border:1px solid #ccc;">`
                     )
                     .join("")}
                 </div>`
              : ""
          }
        </div>
      `;

      await transporter.sendMail({
        from: `"World Trust Express" <${process.env.GMAIL_USER}>`,
        to: "wrldtrustexpress@proton.me",
        subject: `📦 New Shipment from ${senderName}`,
        html: htmlMessage,
      });

      return res.status(200).json({ success: true, message: "Email sent" });
    } catch (err) {
      console.error("❌ Email send error:", err);
      return res.status(500).json({ error: "Failed to send email" });
    }
  });
};
