const passport = require("../libs/passport");

// module.exports = passport.authenticate('jwt', { session: false })

const { User } = require('../models')
const jwt = require('jsonwebtoken')

const { JWT_SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
    const bearerToken = req.headers['authorization'] || ""; //Bearer oasdifhnaosiduyfgoaisdjfniasudyfghaiosdjfnoasidyufghaosdkjfh

    if (bearerToken === "" || bearerToken === "undefined") {
        return res.sendStatus(401)
    } else if (!bearerToken.startsWith("Bearer ")) {
        return res.sendStatus(401)
    }

    const accessToken = bearerToken.replace("Bearer ", "")

    const isVerified = jwt.verify(accessToken, JWT_SECRET_KEY)

    if (!isVerified) {
        return res.sendStatus(401)
    }

    const payload = jwt.decode(accessToken)

    const user = await User.findByPk(payload.id)

    if (!user) {
        return res.sendStatus(401)
    }

    req.user = user;
    return next();

}
