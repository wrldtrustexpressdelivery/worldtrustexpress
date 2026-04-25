// api/newShipment.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
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
      images
    } = req.body;

    // --- Setup Nodemailer transport with Gmail ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // --- Build styled HTML email ---
    const htmlMessage = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:8px;background:#fafafa;">
        <h2 style="color:#2c3e50;">🚚 New Shipment Received</h2>

        <h3 style="color:#34495e;">👤 Sender</h3>
        <p><b>Name:</b> ${senderName}<br>
        <b>Email:</b> ${senderEmail}<br>
        <b>Phone:</b> ${senderPhone}</p>

        <h3 style="color:#34495e;">👤 Receiver</h3>
        <p><b>Name:</b> ${receiverName}<br>
        <b>Email:</b> ${receiverEmail}<br>
        <b>Phone:</b> ${receiverPhone}</p>

        <h3 style="color:#34495e;">📍 Locations</h3>
        <p><b>Current Location:</b> ${current_location}<br>
        <b>Destination:</b> ${destination}</p>

        <h3 style="color:#34495e;">📦 Package</h3>
        <p><b>Item Name:</b> ${itemName}<br>
        <b>Description:</b> ${itemDescription}<br>
        <b>Weight:</b> ${weight}</p>

        ${
          images && images.length
            ? `<h3 style="color:#34495e;">📎 Images</h3>
               <div style="display:flex;gap:10px;flex-wrap:wrap;">
                 ${images
                   .map(
                     (url) =>
                       `<img src="${url}" alt="Shipment Image" style="width:120px;height:auto;border-radius:6px;border:1px solid #ccc;">`
                   )
                   .join("")}
               </div>`
            : ""
        }
      </div>
    `;

    // --- Send email ---
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
}
