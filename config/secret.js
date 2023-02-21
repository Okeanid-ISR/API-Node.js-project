require("dotenv").config();

exports.config = {
    mongoUser:process.env.DBUSER,
    mongoPass:process.env.DBPASS,
    tokenSecret:process.env.TOKENSECRET
}