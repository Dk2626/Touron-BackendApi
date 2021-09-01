const nodemailer = require("nodemailer");
const express = require("express");

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "reservations@touron.in",
    pass: "u0FfuR3Kx29Z",
  },
});
``;

const sendmail = (name, email, cc, attachment, destination, res) => {
  const pdfs = attachment?.map((a) => {
    return {
      filename: a.filename,
      path: a.path,
    };
  });

  const mailOptions = {
    from: "reservations@touron.in",
    to: email,
    cc: cc,
    Date: "Wed, 25 Aug 2021 12:24:49 +0530",
    subject: `Hotel Booking Confirmation - ${destination} !`,
    attachments: pdfs,
    html: `<body style="margin: 0; padding: 0;"> 
      <p>Dear ${name},<p>
<p style="font-family: Lato;color:black">Greetings! Hope you are doing well!!</p>
<p style="font-family: Lato;color:black">We have completed booking your resort for your travel dates as below</p>



${attachment
  ?.map((a) => {
    return `
    <p>
      <span style="color: #0000ff;">
        <strong>
          <span class="x_-1266463454highlight">
            <span class="x_-1266463454colour">${a?.hotelName}</span>
          </span>
        </strong>
      </span>
      |
      <span>
        ${a?.checkIn} - ${a?.checkOut}
      </span>
      <span style="color: #ff0000;">
        <strong>
          <span class="x_-1266463454colour">
            <em>
              <strong>
                <span class="x_-1266463454colour">
                  <em>(${a?.mealPlan})</em>
                </span>
              </strong>
            </em>
          </span>
        </strong>
      </span>
    </p>
    `;
  })
  .join("")}

<p style="font-family: Lato;color:black">Please find the attached confirmation voucher & feel free to reach us for any queries</p>
<p style="font-family: Lato;color:black">Happy Day to you!! <p>
<div style={{display: "flex"}}>
 <img src="https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/WhatsApp%20Image%202021-09-01%20at%2013.08.51.jpeg?alt=media&token=82d193c1-0c21-4eba-9312-6a4d9a71f1d1"  width='100%' height='100%'/>

 <div>

<div style={{display: "flex"}}>
<p style="font-family: Lato;color:black">Click here for:</p>
<a href="https://www.touron.in/" target="_blank">Website</a>
<a href="https://www.facebook.com/touronholidays" target="_blank">Facebook</a>
<a href="https://www.instagram.com/touronholidays" target="_blank">Instagram</a>

</div>
</div>
 </div>
        
        </body>
            `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ Success: false, error: error }).status(400);
    }
    console.log("Message sent: " + info.response);
    res.json({ Success: true }).status(200);
  });
};

router.post("/sendhotelemail", async (req, res) => {
  console.log(`req.body`, req.body);
  const { name, email, cc, attachments, destination } = req.body;
  sendmail(name, email, cc, attachments, destination, res);
});

module.exports = router;
