const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const dev = process.env.NODE_ENV !== "production";

exports.COOKIE_OPTIONS = {
    /*to prevent client access */
    httpOnly:true, 
    /*secure only for production */
    secure: !dev,
    signed:true,
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    /*client and server have different domains */
    sameSite:"none",

};
/*creates the JWT */
exports.getToken = user => {
    return jwt.sign(user,process.env.JWT_SECRET, {
        expiresIn: eval(process.env.SESSION_EXPIRY)
    })
};
/*create jwt refresh token */
exports.getRefreshToken = user => {
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
    })
    return refreshToken;
};
/*called for every authenticated request */
exports.verifyUser = passport.authenticate('jwt', {session: false});