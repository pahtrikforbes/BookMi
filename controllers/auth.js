const mongoose = require("mongoose");
const User = mongoose.model("users");
const Token = mongoose.model("tokens");
const bcrypt = require("bcryptjs");
const { registrationSchema, recover, login } = require("../utils/schemas");
const { generateVerificationToken, generateJWT } = require("../utils/token");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.register = async (req, res) => {
  try {
    let { error } = registrationSchema.validate(req.body, {
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

    if (user)
      return res.status(400).send({
        message: `Account already exists.`,
      });

    const newUser = new User({ ...req.body });

    // Hash password before saving in database
    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        const user_ = await newUser.save();
        const verToken = generateVerificationToken(user_.id);
        const verToken_ = await verToken.save();
        sendEmail(user_, verToken_);

        res.status(200).send({
          message:
            "Your registration is successfully. Follow instructions in email to verify your account",
           user: user_,
        });
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: `An error occurred while registering`,
    });
  }
};

// EMAIL VERIFICATION
// GET api/verify/:token
// Verify token
exports.verify = async (req, res) => {
  if (!req.params.token)
    return res.status(401).send({ message: "Invalid token" });

  try {
    // Find a matching token
    const token = await Token.findOne({ token: req.params.token });

    if (!token)
      return res.status(401).send({
        message: "Token seem to be invalid. Please try requesting a new token",
      });

    // If we found a token, find a matching user
    User.findOne({ _id: token.userId }, (err, user) => {
      if (!user) return res.status(400).send({ message: "Invalid token" });

      if (user.isVerified)
        res.redirect(process.env.VERIFICATION_PAGE + '/alreadyVerified');

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) {
          throw err;
        }

        res.redirect(process.env.VERIFICATION_PAGE);
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: `Encountered an error verifying user` });
  }
};

exports.resendToken = async (req, res) => {
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
      return res.status(401).send({
        message:
          "The email address " +
          req.body.email +
          " is not associated with any account. Double-check your email address and try again.",
      });

    if (user.isVerified)
        return res.redirect(process.env.VERIFICATION_PAGE + '/alreadyVerified');

    const verToken = generateVerificationToken(user_.id);
    const verToken_ = await verToken.save();

    sendEmail(user, verToken_);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Encountered an error resending token` });
  }
};

// api/auth/login
// Login user and return JWT token
exports.login = async (req, res) => {
  try {
    let { error } = login.validate(req.body, {
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
    const { email, password } = req.body;

    const user = await User.findOne({ email });
  
    if (!user)
      return res.status(401).send({
        message: `The email ${email} is invalid. Please check your email and try again.`,
      });

    try {
      //validate password
      let validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).send({ message: "Invalid email or password" });
      }

      // Make sure the user has been verified
      if (!user.isVerified)
        return res.status(401).send({
          type: "not-verified",
          message: "Your account has not been verified.",
        });
      // Login successful, write jwt and send back token to user
      res.status(200).send({ token: `Bearer ` + generateJWT(user) });
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Encountered an error logging in` });
  }
};

function sendEmail(user, token) {
  let link = `${process.env.EMAIL_LINK_SCHEME}${process.env.API_HOST}/api/auth/verify/${token.token}`;
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
                                          
                                          <div style="text-align: center;">${process.env.VERIFICATION_EMAIL_BODY}</div>
              </td>
            </tr>
          </table>
          
        <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 51px 0px;background-color:#ffffff"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center">
          <tbody><tr><td align="center" bgcolor="#32A9D6" class="inner-td" style="-webkit-border-radius:0px;-moz-border-radius:0px;border-radius:0px;font-size:15px;text-align:center;background-color:inherit">
          <a style="background-color:#32A9D6;height:px;width:px;font-size:15px;line-height:px;font-family:Helvetica, Arial, sans-serif;color:#ffffff;padding:14px 56px 13px 56px;text-decoration:none;-webkit-border-radius:0px;-moz-border-radius:0px;border-radius:0px;border:1px solid #32A9D6;display:inline-block" href="${link}" target="_blank">Verify your account</a></td></tr></tbody></table></td></tr></tbody></table>
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
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
}
