const { recover, resetPassword } = require("../utils/schemas");
const { generateResetToken } = require("../utils/token");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = mongoose.model("users");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// First access point for resetting password
exports.recover = async (req, res) => {
  try {
    let { error } = recover.validate(req.body, {
      abortEarly: false,
    });

    //If there is an error return a response with proper status code
    if (error) {
      return res
        .status(400)
        .send(
          `Validation error: ${error.details.map((x) => x.message).join(", ")}`
        );
    }

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).send({
        message:
          "The email address " +
          req.body.email +
          " is not associated with any account. Double-check your email address and try again.",
      });

    const newUser = generateResetToken(user);
    const user_ = await newUser.save();
    sendEmail(user_, res);
  } catch (error) {
    res.status(500).send({ message: `Encountered an error validating token` });
  }
};

/** api/auth/reset
 * Validate password reset token and redirect reset view page
 * Second point of contact for resetting password, this endpoint will
 * get accessed when user follows link in email
 * */

exports.reset = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(401)
        .send({ message: "Password reset token is invalid or has expired." });

    //Redirect user to client with the page for changing the password
    res.redirect(process.env.UPDATE_PASSWORD_PAGE + token);
  } catch (error) {
    console.error(error);

    res.status(500).send({ message: `Encountered an error validating token` });
  }
};

// api/auth/reset
// Reset Password
// Final point of contact for resetting password. This is where the actual password reset occurs

exports.resetPassword = (req, res) => {
  try {
    let { error } = resetPassword.validate(req.body, {
      abortEarly: false,
    });

    //If there is an error return a response with proper status code
    if (error) {
      return res
        .status(400)
        .send(
          `Validation error: ${error.details.map((x) => x.message).join(", ")}`
        );
    }

    User.findOne({
      resetPasswordToken: req.body.resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).then((user) => {
      if (!user)
        return res
          .status(401)
          .send({ message: "Password reset token is invalid or has expired." });

      //Set the new password
      // Hash password before saving in database
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw err;

          user.password = hash;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          user.isVerified = true;
          // Save
          user.save((err) => {
            if (err) throw err;

            // send email
            const mailOptions = {
              to: user.email,
              from: process.env.VERIFICATION_FROM_EMAIL,
              subject: "Your password has been changed",
              text: `Hi ${user.firstName},  
                    This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
            };

            sgMail.send(mailOptions, (error, result) => {
              if (error)
                return res.status(500).send({ message: error.message });

              res
                .status(200)
                .send({ message: "Your password has been updated." });
            });
          });
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Encounterd on issue resetting password" });
  }
};

function sendEmail(user, res) {
  let link = `${process.env.EMAIL_LINK_SCHEME}${process.env.API_HOST}/api/auth/reset/${user.resetPasswordToken}`;
  const mailOptions = {
    to: user.email,
    from: process.env.VERIFICATION_FROM_EMAIL,
    subject: "Account Verification Token",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {width: 600px;margin: 0 auto;}
            table {border-collapse: collapse;}
            table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
            img {-ms-interpolation-mode: bicubic;}
          </style>
          <![endif]-->
      
          <style type="text/css">
            body, p, div {
              font-family: arial;
              font-size: 14px;
            }
            body {
              color: #626262;
            }
            body a {
              color: #0088cd;
              text-decoration: none;
            }
            p { margin: 0; padding: 0; }
            table.wrapper {
              width:100% !important;
              table-layout: fixed;
              -webkit-font-smoothing: antialiased;
              -webkit-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            img.max-width {
              max-width: 100% !important;
            }
            .column.of-2 {
              width: 50%;
            }
            .column.of-3 {
              width: 33.333%;
            }
            .column.of-4 {
              width: 25%;
            }
            @media screen and (max-width:480px) {
              .preheader .rightColumnContent,
              .footer .rightColumnContent {
                  text-align: left !important;
              }
              .preheader .rightColumnContent div,
              .preheader .rightColumnContent span,
              .footer .rightColumnContent div,
              .footer .rightColumnContent span {
                text-align: left !important;
              }
              .preheader .rightColumnContent,
              .preheader .leftColumnContent {
                font-size: 80% !important;
                padding: 5px 0;
              }
              table.wrapper-mobile {
                width: 100% !important;
                table-layout: fixed;
              }
              img.max-width {
                height: auto !important;
                max-width: 480px !important;
              }
              a.bulletproof-button {
                display: block !important;
                width: auto !important;
                font-size: 80%;
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
              .columns {
                width: 100% !important;
              }
              .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
            }
          </style>
          <!--user entered Head Start-->
          
           <!--End Head user entered-->
        </head>
        <body>
          <center class="wrapper" data-link-color="#0088cd" data-body-style="font-size: 14px; font-family: arial; color: #626262; background-color: #F4F4F4;">
            <div class="webkit">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#F4F4F4">
                <tr>
                  <td valign="top" bgcolor="#F4F4F4" width="100%">
                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="100%">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <!--[if mso]>
                                <center>
                                <table><tr><td width="600">
                                <![endif]-->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                                  <tr>
                                    <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #626262; text-align: left;" bgcolor="#F4F4F4" width="100%" align="left">
              
        
          <table class="module"
                 role="module"
                 data-type="spacer"
                 border="0"
                 cellpadding="0"
                 cellspacing="0"
                 width="100%"
                 style="table-layout: fixed;">
            <tr>
              <td style="padding:0px 0px 34px 0px;"
                  role="module-content"
                  bgcolor="">
              </td>
            </tr>
          </table>
        
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:34px 23px 34px 23px;background-color:#ffffff;"
                  height="100%"
                  valign="top"
                  bgcolor="#ffffff">
                  <div style="text-align: center;"><img src=${process.env.LOGO} alt=veme logo/></div>
                  
                  <h1 style="text-align: center;"><span style="color:#2D2D2D;">Hey ${user.firstName} </span></h1>
                                          
                                          <div style="text-align: center;">${process.env.PASSWORD_UPDATE_BODY}</div>
              </td>
            </tr>
          </table>
          
        <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 51px 0px;background-color:#ffffff"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center">
          <tbody><tr><td align="center" bgcolor="#32A9D6" class="inner-td" style="-webkit-border-radius:0px;-moz-border-radius:0px;border-radius:0px;font-size:15px;text-align:center;background-color:inherit">
          <a style="background-color:#32A9D6;height:px;width:px;font-size:15px;line-height:px;font-family:Helvetica, Arial, sans-serif;color:#ffffff;padding:14px 56px 13px 56px;text-decoration:none;-webkit-border-radius:0px;-moz-border-radius:0px;border-radius:0px;border:1px solid #32A9D6;display:inline-block" href="${link}" target="_blank">Reset Password</a></td></tr></tbody></table></td></tr></tbody></table>
        <div style="text-align: center;">If you did not request this, please ignore this email.</div>
          
        
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                                </td></tr></table>
                                </center>
                                <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </center>
        </body>
      </html>`,
  };

  sgMail.send(mailOptions).then(
    () => {
      console.log("Email Sent");
      res.status(200).send({ message: "Email sent for password reset" });
    },
    (error) => {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error encountered trying to send email" });
      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
}
