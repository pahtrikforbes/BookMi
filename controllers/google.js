const { OAuth2Client } = require('google-auth-library');
const mongoose = require('mongoose');
const { generateJWT } = require('../utils/token');
const User = mongoose.model("users")

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URL
);

exports.generateUrl = async (req, res) => {
    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
        prompt: 'consent',
        response_type: 'code',
        include_granted_scopes: true
    });

    res.redirect(authorizeUrl)
}

exports.googleCallBack = async (req, res) => {
    try {
        const tokens = await oAuth2Client.getToken(req.query.code);
        // Make sure to set the credentials on the OAuth2 client.
       oAuth2Client.setCredentials(tokens.tokens);

        //url for google users
        const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`;
        //fetch user info using client
        const userInfo = await oAuth2Client.request({ url });
    
        if(userInfo){
            let existingUser = await User.findOne({email: userInfo.email})
    
            if(existingUser){
             // Login successful, write jwt and send back token to user
                return res.status(200).send({ token: `Bearer ` + generateJWT(existingUser) });
            }else {
                const { given_name, family_name, email} = userInfo
                //store this user in our database
                const newUser = await new User({firstName: given_name, lastName: family_name, email}).save()
                if(newUser){
                //Login successful, write jwt and send back token to user
                    return res.status(200).send({ token: `Bearer ` + generateJWT(newUser) });
                }else{
                    return res.status(500).send({ message: 'Error trying to login with google' });
                }
            }
    
        }else {
           throw new Error("Error while trying to fetch user info")
            //res.redirect("/")
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error trying to login with google' });
    }
   
}