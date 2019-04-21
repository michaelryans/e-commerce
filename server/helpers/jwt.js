const jwt = require('jsonwebtoken')

module.exports = {
    jwtSign(input) {
        const token = jwt.sign(input, process.env.JWT_TOKEN)
        return token
    },
    jwtVerify(input_token) {
        const decoded = jwt.verify(input_token,process.env.JWT_TOKEN)
        return decoded
    }
}