const bcrypt = require('bcryptjs')

module.exports = {
    bcryptHash(input) {
        const hash = bcrypt.hashSync(input, 10)
        return hash
    },
    bcryptCompare(input, hashed) {
        const compared = bcrypt.compareSync(input,hashed)
        return compared
    }
}