const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @desc Sends email using SendGrid API
// @route /api/contact/email
// @method POST

router.post("/email", (req, res) => {
  const { to, from, subject, text } = req.body;

  // Detailed information on body
  const detailedText = `The buyer, ${from} is interested in your product. \n\n ${text}`;

  // Set message structure for POST request on sgMail
  const msg = {
    to,
    from: "takuya.k.toyokawa@protonmail.com",
    subject,
    text: detailedText,
  };

  return sgMail
    .send(msg)
    .then(() => {
      console.log("success");
      res.send({
        success: true,
        message: "Successfully sent email!",
      });
    })
    .catch(() => {
      res.send({
        success: false,
        message: "Failed to send email.",
      });
    });
});

module.exports = router;
